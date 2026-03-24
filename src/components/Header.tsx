import type { GameStatus } from "../domain/bingo/types";

interface HeaderProps {
  canFinish: boolean;
  canPause: boolean;
  canResume: boolean;
  drawCount: number;
  onFinish: () => void;
  onPause: () => void;
  onPrimaryAction: () => void;
  onReset: () => void;
  primaryActionDisabled: boolean;
  primaryActionLabel: string;
  remainingCount: number;
  status: GameStatus;
}

const statusLabel: Record<GameStatus, string> = {
  pending: "Pendiente",
  active: "Partida en curso",
  paused: "Pausado",
  finished: "Finalizado",
  cancelled: "Cancelado",
};

export function Header({
  canFinish,
  canPause,
  canResume,
  drawCount,
  onFinish,
  onPause,
  onPrimaryAction,
  onReset,
  primaryActionDisabled,
  primaryActionLabel,
  remainingCount,
  status,
}: HeaderProps) {
  const pauseLabel = canResume ? "Reanudar" : "Pausar";
  const pauseDisabled = !canPause && !canResume;

  return (
    <header className="app-header">
      <div>
        <p className="eyebrow">Sorteo de bingo 90 bolas</p>
        <h1>Bingo FUP</h1>
      </div>

      <div className="header-actions">
        <div className="status-chip" aria-live="polite">
          <span className="status-dot" />
          {statusLabel[status]}
        </div>

        <div className="metric-chip">
          <strong>{drawCount}</strong>
          <span>salieron</span>
        </div>

        <div className="metric-chip">
          <strong>{remainingCount}</strong>
          <span>faltan</span>
        </div>

        <button className="ghost-button" onClick={onPause} disabled={pauseDisabled} type="button">
          {pauseLabel}
        </button>
        <button className="ghost-button" onClick={onFinish} disabled={!canFinish} type="button">
          Finalizar
        </button>
        <button className="ghost-button" onClick={onReset} type="button">
          Reiniciar juego
        </button>
        <button
          className="primary-button"
          disabled={primaryActionDisabled}
          onClick={onPrimaryAction}
          type="button"
        >
          {primaryActionLabel}
        </button>
      </div>
    </header>
  );
}
