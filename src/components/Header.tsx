interface HeaderProps {
  drawCount: number;
  onPrimaryAction: () => void;
  onReset: () => void;
  primaryActionDisabled: boolean;
  primaryActionLabel: string;
  remainingCount: number;
}

type LogoModuleMap = Record<string, string>;

const logoModules = import.meta.glob("../assets/branding/company-logo.*", {
  eager: true,
  import: "default",
}) as LogoModuleMap;

const companyLogo = Object.values(logoModules)[0] ?? null;

export function Header({
  drawCount,
  onPrimaryAction,
  onReset,
  primaryActionDisabled,
  primaryActionLabel,
  remainingCount,
}: HeaderProps) {
  const stageCopy =
    drawCount === 0
      ? "Todo listo para empezar a cantar números"
      : remainingCount <= 10
        ? "Entramos en los últimos números de la ronda"
        : "La ronda ya está en movimiento";

  return (
    <header className="app-header">
      <div className="header-brand">
        {companyLogo ? (
          <img
            src={companyLogo}
            alt="Logo de la empresa"
            className="header-company-logo"
            draggable="false"
          />
        ) : null}

        <div>
          <h1>Bingo FUPBI</h1>
          <p className="header-note">{stageCopy}</p>
        </div>
      </div>

      <div className="header-actions">
        <div className="metric-chip">
          <strong>{drawCount}</strong>
          <span>salieron</span>
        </div>

        <div className="metric-chip">
          <strong>{remainingCount}</strong>
          <span>faltan</span>
        </div>

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
