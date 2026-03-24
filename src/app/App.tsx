import { BallMachine } from "../components/BallMachine";
import { CurrentNumberCard } from "../components/CurrentNumberCard";
import { DrawHistoryTape } from "../components/DrawHistoryTape";
import { Header } from "../components/Header";
import { useBingoGame } from "./useBingoGame";

interface AppProps {
  animationDurationMs?: number;
  now?: () => string;
  random?: () => number;
}

export function App({ animationDurationMs, now, random }: AppProps) {
  const game = useBingoGame({ animationDurationMs, now, random });

  return (
    <div className="app-shell">
      <div className="app-backdrop app-backdrop-left" />
      <div className="app-backdrop app-backdrop-right" />

      <Header
        drawCount={game.session.drawnNumbers.length}
        onPrimaryAction={game.primaryAction.onClick}
        onReset={game.reset}
        primaryActionDisabled={game.primaryAction.disabled}
        primaryActionLabel={game.primaryAction.label}
        remainingCount={game.remainingCount}
      />

      <div className="app-body-grid">
        <aside className="panel-left">
          <BallMachine
            currentNumber={game.revealedCurrentNumber}
            drawCount={game.revealedDrawnNumbers.length}
            isSpinning={game.isAnimating}
            onDraw={game.session.status === "active" ? game.primaryAction.onClick : undefined}
          />
        </aside>

        <section className="panel-right">
          <CurrentNumberCard
            currentNumber={game.revealedCurrentNumber}
            isSpinning={game.isAnimating}
            remainingCount={game.remainingCount}
          />
        </section>
      </div>

      <div className="app-history-row">
        <DrawHistoryTape drawnNumbers={game.revealedDrawnNumbers} />
      </div>
    </div>
  );
}
