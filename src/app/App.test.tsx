import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("App", () => {
  it("starts, draws a number and resets coherently", async () => {
    const user = userEvent.setup();
    const randomValues = [0.1];
    const nowValues = [
      "2026-03-10T18:00:00.000Z",
      "2026-03-10T18:00:01.000Z",
      "2026-03-10T18:00:02.000Z",
      "2026-03-10T18:00:03.000Z",
    ];

    render(
      <App
        animationDurationMs={200}
        now={() => nowValues.shift() ?? "2026-03-10T18:00:59.000Z"}
        random={() => randomValues.shift() ?? 0}
      />,
    );

    expect(screen.getByRole("button", { name: "Iniciar juego" })).toBeEnabled();
    expect(screen.getAllByText("--").length).toBeGreaterThan(0);

    await user.click(screen.getByRole("button", { name: "Iniciar juego" }));
    await user.click(screen.getByRole("button", { name: "Sortear siguiente" }));

    expect(screen.getByText("??")).toBeInTheDocument();

    expect((await screen.findAllByText("10")).length).toBeGreaterThan(0);
    expect(screen.getByText("1 extraidos")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Reiniciar juego" }));

    expect(screen.getAllByText("--").length).toBeGreaterThan(0);
    expect(screen.getByText("0 extraidos")).toBeInTheDocument();
  });
});
