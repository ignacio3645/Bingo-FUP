interface CurrentNumberCardProps {
  currentNumber: number | null;
  isSpinning: boolean;
  remainingCount: number;
  statusLabel: string;
}

export function CurrentNumberCard({
  currentNumber,
  isSpinning,
  remainingCount,
  statusLabel,
}: CurrentNumberCardProps) {
  const displayValue = isSpinning ? "??" : currentNumber === null ? "--" : String(currentNumber).padStart(2, "0");

  return (
    <section className="current-number-card">
      <div className="section-copy">
        <p className="eyebrow">Numero actual</p>
        <h2>Lectura principal</h2>
      </div>

      <div className={`number-display${isSpinning ? " number-display-pending" : ""}`} aria-live="polite">
        {displayValue}
      </div>

      <div className="number-meta">
        <span>Quedan {remainingCount} bolillas</span>
        <span>{statusLabel}</span>
      </div>
    </section>
  );
}
