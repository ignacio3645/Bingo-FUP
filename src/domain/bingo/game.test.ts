import { describe, expect, it } from "vitest";
import {
  canDrawNumber,
  createSession,
  createNumberUniverse,
  drawNextNumber,
  pauseSession,
  resetSession,
  resumeSession,
  startSession,
} from "./game";

describe("bingo game domain", () => {
  it("creates a clean universe from 1 to 90", () => {
    const universe = createNumberUniverse();

    expect(universe).toHaveLength(90);
    expect(universe[0]).toBe(1);
    expect(universe[89]).toBe(90);
  });

  it("draws 90 unique numbers without repetition", () => {
    let session = startSession(createSession("2026-03-10T18:00:00.000Z"), "2026-03-10T18:00:01.000Z");

    for (let turn = 0; turn < 90; turn += 1) {
      session = drawNextNumber(session, 0, `2026-03-10T18:00:${String(turn + 2).padStart(2, "0")}.000Z`);
    }

    expect(session.drawnNumbers).toHaveLength(90);
    expect(new Set(session.drawnNumbers).size).toBe(90);
    expect(session.availableNumbers).toHaveLength(0);
    expect(session.status).toBe("finished");
    expect(canDrawNumber(session)).toBe(false);
  });

  it("pauses and resumes without losing drawn history", () => {
    let session = startSession(createSession("2026-03-10T18:00:00.000Z"), "2026-03-10T18:00:01.000Z");
    session = drawNextNumber(session, 0.2, "2026-03-10T18:00:02.000Z");
    session = pauseSession(session, "2026-03-10T18:00:03.000Z");

    expect(session.status).toBe("paused");
    expect(() => drawNextNumber(session, 0.2, "2026-03-10T18:00:04.000Z")).toThrow();

    session = resumeSession(session, "2026-03-10T18:00:05.000Z");

    expect(session.status).toBe("active");
    expect(session.drawnNumbers).toHaveLength(1);
  });

  it("resets into a clean session with full number availability", () => {
    const original = startSession(createSession("2026-03-10T18:00:00.000Z"), "2026-03-10T18:00:01.000Z");
    const reset = resetSession(original, "2026-03-10T18:10:00.000Z");

    expect(reset.sessionId).not.toBe(original.sessionId);
    expect(reset.status).toBe("pending");
    expect(reset.currentNumber).toBeNull();
    expect(reset.drawnNumbers).toHaveLength(0);
    expect(reset.availableNumbers).toHaveLength(90);
    expect(reset.auditLog.at(-1)?.type).toBe("session_reset");
  });
});
