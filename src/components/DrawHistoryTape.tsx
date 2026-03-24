import { useEffect, useRef } from "react";

interface DrawHistoryTapeProps {
  drawnNumbers: number[];
}

export function DrawHistoryTape({ drawnNumbers }: DrawHistoryTapeProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!trackRef.current) {
      return;
    }

    if (typeof trackRef.current.scrollTo === "function") {
      trackRef.current.scrollTo({
        left: trackRef.current.scrollWidth,
        behavior: "smooth",
      });
      return;
    }

    trackRef.current.scrollLeft = trackRef.current.scrollWidth;
  }, [drawnNumbers.length]);

  return (
    <section className="history-card">
      <div className="history-header">
        <div>
          <p className="eyebrow">Historial</p>
          <h2>Cinta ordenada de numeros sorteados</h2>
        </div>
        <p className="history-count">{drawnNumbers.length} extraidos</p>
      </div>

      <div className="history-track" aria-label="Numeros ya sorteados" ref={trackRef}>
        {drawnNumbers.map((number, index) => (
          <article className="history-pill" key={`${number}-${index}`}>
            <span className="history-order">{String(index + 1).padStart(2, "0")}</span>
            <strong>{String(number).padStart(2, "0")}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
