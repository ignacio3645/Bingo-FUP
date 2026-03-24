interface CurrentNumberCardProps {
  currentNumber: number | null;
  isSpinning: boolean;
  remainingCount: number;
}

export function CurrentNumberCard({
  currentNumber,
  isSpinning,
  remainingCount,
}: CurrentNumberCardProps) {
  const displayValue = isSpinning ? "??" : currentNumber === null ? "--" : String(currentNumber).padStart(2, "0");
  const supportCopy = isSpinning
    ? "La suerte ya viene girando"
    : currentNumber === null
      ? "El tablero espera el primer numero de la ronda"
      : "Este es el numero que acaba de salir";

  return (
    <section className="current-number-card">
      <div className="section-copy">
        <h2>Numero sorteado</h2>
        <p className="section-note">{supportCopy}</p>
      </div>

      <div className={`number-display${isSpinning ? " number-display-pending" : ""}`} aria-live="polite">
        {displayValue}
      </div>

      <div className="number-meta">
        <span>Quedan {remainingCount} bolillas</span>
      </div>
    </section>
  );
}
