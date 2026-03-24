import type { BingoAuditEvent, BingoSession, GameStatus } from "./types";

const MIN_NUMBER = 1;
const MAX_NUMBER = 90;

export class BingoGameError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BingoGameError";
  }
}

export function createNumberUniverse() {
  return Array.from({ length: MAX_NUMBER }, (_, index) => index + MIN_NUMBER);
}

function buildAuditEvent(
  type: BingoAuditEvent["type"],
  timestamp: string,
  payload?: BingoAuditEvent["payload"],
): BingoAuditEvent {
  return {
    id: `${type}-${timestamp}-${Math.random().toString(36).slice(2, 8)}`,
    type,
    timestamp,
    payload,
  };
}

export function createSession(timestamp: string) {
  const sessionId = `session-${timestamp}`;

  return {
    sessionId,
    createdAt: timestamp,
    startedAt: null,
    endedAt: null,
    status: "pending",
    availableNumbers: createNumberUniverse(),
    drawnNumbers: [],
    currentNumber: null,
    auditLog: [
      buildAuditEvent("session_created", timestamp, {
        sessionId,
      }),
    ],
  } satisfies BingoSession;
}

function appendEvent(session: BingoSession, event: BingoAuditEvent) {
  return {
    ...session,
    auditLog: [...session.auditLog, event],
  };
}

export function canStartSession(status: GameStatus) {
  return status === "pending";
}

export function canDrawNumber(session: BingoSession) {
  return session.status === "active" && session.availableNumbers.length > 0;
}

export function canPauseSession(status: GameStatus) {
  return status === "active";
}

export function canResumeSession(status: GameStatus) {
  return status === "paused";
}

export function canFinishSession(status: GameStatus) {
  return status === "active" || status === "paused";
}

export function getRemainingCount(session: BingoSession) {
  return session.availableNumbers.length;
}

export function startSession(session: BingoSession, timestamp: string) {
  if (!canStartSession(session.status)) {
    throw new BingoGameError("Only pending sessions can be started.");
  }

  return appendEvent(
    {
      ...session,
      status: "active",
      startedAt: timestamp,
    },
    buildAuditEvent("session_started", timestamp, {
      sessionId: session.sessionId,
    }),
  );
}

export function drawNextNumber(
  session: BingoSession,
  randomValue: number,
  timestamp: string,
) {
  if (!canDrawNumber(session)) {
    throw new BingoGameError("The session is not ready to draw a number.");
  }

  const boundedRandom = Math.min(Math.max(randomValue, 0), 0.999999999999);
  const index = Math.floor(boundedRandom * session.availableNumbers.length);
  const nextNumber = session.availableNumbers[index];

  if (nextNumber === undefined) {
    throw new BingoGameError("No number could be selected from the available pool.");
  }

  const availableNumbers = session.availableNumbers.filter((_, itemIndex) => itemIndex !== index);
  const drawnNumbers = [...session.drawnNumbers, nextNumber];
  const baseSession: BingoSession = {
    ...session,
    availableNumbers,
    drawnNumbers,
    currentNumber: nextNumber,
    status: availableNumbers.length === 0 ? "finished" : "active",
    endedAt: availableNumbers.length === 0 ? timestamp : session.endedAt,
  };

  const withDrawEvent = appendEvent(
    baseSession,
    buildAuditEvent("number_drawn", timestamp, {
      drawOrder: drawnNumbers.length,
      number: nextNumber,
      sessionId: session.sessionId,
    }),
  );

  if (availableNumbers.length > 0) {
    return withDrawEvent;
  }

  return appendEvent(
    withDrawEvent,
    buildAuditEvent("session_finished", timestamp, {
      sessionId: session.sessionId,
    }),
  );
}

export function pauseSession(session: BingoSession, timestamp: string) {
  if (!canPauseSession(session.status)) {
    throw new BingoGameError("Only active sessions can be paused.");
  }

  return appendEvent(
    {
      ...session,
      status: "paused",
    },
    buildAuditEvent("session_paused", timestamp, {
      sessionId: session.sessionId,
    }),
  );
}

export function resumeSession(session: BingoSession, timestamp: string) {
  if (!canResumeSession(session.status)) {
    throw new BingoGameError("Only paused sessions can be resumed.");
  }

  return appendEvent(
    {
      ...session,
      status: "active",
    },
    buildAuditEvent("session_resumed", timestamp, {
      sessionId: session.sessionId,
    }),
  );
}

export function finishSession(session: BingoSession, timestamp: string) {
  if (!canFinishSession(session.status)) {
    throw new BingoGameError("Only active or paused sessions can be finished.");
  }

  return appendEvent(
    {
      ...session,
      status: "finished",
      endedAt: timestamp,
    },
    buildAuditEvent("session_finished", timestamp, {
      sessionId: session.sessionId,
    }),
  );
}

export function resetSession(previousSession: BingoSession, timestamp: string) {
  const nextSession = createSession(timestamp);

  return {
    ...nextSession,
    auditLog: [
      ...nextSession.auditLog,
      buildAuditEvent("session_reset", timestamp, {
        sessionId: nextSession.sessionId,
        previousSessionId: previousSession.sessionId,
      }),
    ],
  } satisfies BingoSession;
}
