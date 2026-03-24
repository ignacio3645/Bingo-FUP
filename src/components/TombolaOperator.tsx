import { useState } from "react";
import type { CSSProperties } from "react";

interface TombolaOperatorProps {
  onActivate?: () => void;
  isAnimating?: boolean;
  disabled?: boolean;
}

export function TombolaOperator({
  onActivate,
  isAnimating = false,
  disabled = false,
}: TombolaOperatorProps) {
  const [isPushing, setIsPushing] = useState(false);

  const handleClick = () => {
    if (!disabled && !isAnimating && onActivate) {
      setIsPushing(true);
      onActivate();
      window.setTimeout(() => setIsPushing(false), 400);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if ((e.key === "Enter" || e.key === " ") && !disabled && !isAnimating && onActivate) {
      e.preventDefault();
      setIsPushing(true);
      onActivate();
      window.setTimeout(() => setIsPushing(false), 400);
    }
  };

  return (
    <div
      className={`tombola-operator ${isAnimating ? "animating" : ""} ${isPushing ? "pushing" : ""} ${disabled ? "disabled" : ""}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label="Sortear número"
      aria-disabled={disabled}
      style={
        {
          "--animation-duration": "0.8s",
        } as CSSProperties
      }
    >
      <svg
        viewBox="0 0 200 340"
        xmlns="http://www.w3.org/2000/svg"
        className="operator-svg"
      >
        {/* Cabeza simple sin rasgos */}
        <ellipse cx="100" cy="58" rx="30" ry="36" fill="#fde5c4" />

        {/* Pelo corto bob rubio */}
        <path
          d="M 65 55 Q 68 18 100 18 Q 132 18 135 55 Q 138 80 110 80 Q 90 80 70 80 Z"
          fill="#f4bf4e"
        />

        {/* Cuello */}
        <rect x="90" y="85" width="20" height="12" fill="#fde5c4" />

        {/* Torso azul mostaza */}
        <rect x="72" y="97" width="56" height="70" rx="12" fill="#c18812" />

        {/* Pantalón gris oscuro */}
        <rect x="76" y="168" width="48" height="64" rx="12" fill="#444" />

        {/* Piernas */}
        <rect x="80" y="232" width="12" height="30" rx="6" fill="#222" />
        <rect x="108" y="232" width="12" height="30" rx="6" fill="#222" />

        {/* Zapatos negros */}
        <rect x="76" y="262" width="20" height="8" rx="4" fill="#111" />
        <rect x="104" y="262" width="20" height="8" rx="4" fill="#111" />

        {/* Brazos */}
        <g className="operator-left-arm">
          <rect x="53" y="104" width="20" height="64" rx="8" fill="#fde5c4" />
          <rect x="50" y="150" width="26" height="18" rx="8" fill="#c18812" />
        </g>

        <g className="operator-right-arm">
          <rect x="127" y="104" width="20" height="64" rx="8" fill="#fde5c4" />
          <rect x="124" y="150" width="26" height="18" rx="8" fill="#c18812" />
        </g>
      </svg>
    </div>
  );
}
