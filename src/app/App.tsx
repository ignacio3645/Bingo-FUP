import { BallMachine } from "../components/BallMachine";
import { CurrentNumberCard } from "../components/CurrentNumberCard";
import { DrawHistoryTape } from "../components/DrawHistoryTape";
import { Header } from "../components/Header";
import { useBingoGame } from "./useBingoGame";

const machineStatusCopy = {
  pending: "Esperando activacion del operador",
  active: "La tombola gira con resultado gobernado por el motor del juego",
  paused: "Partida detenida temporalmente por el operador",
  finished: "Sesion cerrada, lista para iniciar una nueva partida",
  cancelled: "Sesion cancelada",
} as const;

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
        canFinish={game.canFinish}
        canPause={game.canPause}
        canResume={game.session.status === "paused"}
        drawCount={game.session.drawnNumbers.length}
        onFinish={game.finish}
        onPause={game.session.status === "paused" ? game.primaryAction.onClick : game.pause}
        onPrimaryAction={game.primaryAction.onClick}
        onReset={game.reset}
        primaryActionDisabled={game.primaryAction.disabled}
        primaryActionLabel={game.primaryAction.label}
        remainingCount={game.remainingCount}
        status={game.session.status}
      />

      <main className="main-grid">
        <BallMachine
          currentNumber={game.revealedCurrentNumber}
          isSpinning={game.isAnimating}
          statusLabel={machineStatusCopy[game.session.status]}
        />
        <CurrentNumberCard
          currentNumber={game.revealedCurrentNumber}
          isSpinning={game.isAnimating}
          remainingCount={game.remainingCount}
          statusLabel={machineStatusCopy[game.session.status]}
        />
      </main>

      <DrawHistoryTape drawnNumbers={game.revealedDrawnNumbers} />
    </div>
  );
}
