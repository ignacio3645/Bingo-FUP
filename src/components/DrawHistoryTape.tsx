import { useEffect, useRef, useState } from "react";

interface DrawHistoryTapeProps {
  drawnNumbers: number[];
}

type SortOrder = "original" | "ascending";

export function DrawHistoryTape({ drawnNumbers }: DrawHistoryTapeProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("original");

  const displayNumbers = sortOrder === "original"
    ? drawnNumbers
    : [...drawnNumbers].sort((a, b) => a - b);

  const numbersWithOrder = displayNumbers.map((num) => ({
    value: num,
    originalIndex: drawnNumbers.indexOf(num) + 1,
  }));

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
  }, [drawnNumbers.length, sortOrder]);

  return (
    <section className="history-card">
      <div className="history-header">
        <div>
          <p className="eyebrow">Historial</p>
          <h2>Cinta ordenada de numeros sorteados</h2>
        </div>
        <div className="history-controls">
          <button
            className={`sort-button ${sortOrder === "original" ? "active" : ""}`}
            onClick={() => setSortOrder("original")}
            aria-label="Ordenar por orden de salida"
            title="Orden de salida"
          >
            ⏱️ Orden
          </button>
          <button
            className={`sort-button ${sortOrder === "ascending" ? "active" : ""}`}
            onClick={() => setSortOrder("ascending")}
            aria-label="Ordenar de menor a mayor"
            title="Menor a Mayor"
          >
            📊 Valor
          </button>
          <p className="history-count">{drawnNumbers.length} extraidos</p>
        </div>
      </div>

      <div className="history-track" aria-label="Numeros ya sorteados" ref={trackRef}>
        {numbersWithOrder.map((item, index) => (
          <article className="history-pill" key={`${item.value}-${index}-${sortOrder}`}>
            <span className="history-order">
              {sortOrder === "original" 
                ? String(item.originalIndex).padStart(2, "0")
                : String(index + 1).padStart(2, "0")}
            </span>
            <strong>{String(item.value).padStart(2, "0")}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
