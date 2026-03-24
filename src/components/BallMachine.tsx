import type { CSSProperties } from "react";
import { TombolaOperator } from "./TombolaOperator";

interface BallMachineProps {
  currentNumber: number | null;
  drawCount: number;
  isSpinning: boolean;
  statusLabel: string;
  onDraw?: () => void;
}

const machineParticles = [
  { x: "16%", y: "22%", size: "30px", hue: "gold", duration: "3.4s", delay: "0s" },
  { x: "31%", y: "18%", size: "20px", hue: "green", duration: "4.8s", delay: "-1.1s" },
  { x: "47%", y: "16%", size: "24px", hue: "cream", duration: "3.9s", delay: "-0.6s" },
  { x: "62%", y: "22%", size: "28px", hue: "gold", duration: "4.2s", delay: "-1.9s" },
  { x: "75%", y: "28%", size: "22px", hue: "green", duration: "3.2s", delay: "-0.2s" },
  { x: "20%", y: "38%", size: "22px", hue: "cream", duration: "5.1s", delay: "-1.4s" },
  { x: "36%", y: "34%", size: "34px", hue: "gold", duration: "4.5s", delay: "-2.1s" },
  { x: "52%", y: "37%", size: "20px", hue: "green", duration: "3.7s", delay: "-0.9s" },
  { x: "68%", y: "39%", size: "32px", hue: "cream", duration: "4.4s", delay: "-1.7s" },
  { x: "80%", y: "45%", size: "18px", hue: "gold", duration: "3.6s", delay: "-0.4s" },
  { x: "18%", y: "55%", size: "26px", hue: "green", duration: "4.1s", delay: "-1.2s" },
  { x: "31%", y: "59%", size: "18px", hue: "cream", duration: "3.1s", delay: "-0.8s" },
  { x: "46%", y: "56%", size: "30px", hue: "gold", duration: "5.2s", delay: "-2.5s" },
  { x: "60%", y: "61%", size: "24px", hue: "green", duration: "3.8s", delay: "-1.6s" },
  { x: "74%", y: "58%", size: "28px", hue: "cream", duration: "4.6s", delay: "-0.7s" },
  { x: "26%", y: "74%", size: "20px", hue: "gold", duration: "3.5s", delay: "-2.2s" },
  { x: "43%", y: "76%", size: "26px", hue: "green", duration: "4.9s", delay: "-1.3s" },
  { x: "60%", y: "77%", size: "18px", hue: "cream", duration: "3.3s", delay: "-0.5s" },
  { x: "73%", y: "72%", size: "30px", hue: "gold", duration: "4.3s", delay: "-1.8s" },
  { x: "52%", y: "84%", size: "22px", hue: "cream", duration: "3.9s", delay: "-0.1s" },
] as const;

export function BallMachine({
  currentNumber,
  drawCount,
  isSpinning,
  statusLabel,
  onDraw,
}: BallMachineProps) {
  const handleOperatorClick = () => {
    if (onDraw && !isSpinning) {
      onDraw();
    }
  };

  const formattedNumber = currentNumber === null ? "--" : String(currentNumber).padStart(2, "0");

  return (
    <section className="machine-card">
      <div className="section-copy">
        <p className="eyebrow">Tombola</p>
        <h2>Extraccion visual</h2>
      </div>

      <div className={`machine-stage${isSpinning ? " machine-stage-spinning" : ""}`} aria-hidden="true">
        <div className={`machine-sphere${isSpinning ? " machine-sphere-spinning" : ""}`}>
          <div className="machine-glass">
            <div className={`machine-particle-cloud${isSpinning ? " machine-particle-cloud-spinning" : ""}`}>
              {machineParticles.map((particle, index) => (
                <span
                  className={`machine-particle machine-particle-${particle.hue}`}
                  key={`${particle.x}-${particle.y}-${index}`}
                  style={
                    {
                      "--particle-x": particle.x,
                      "--particle-y": particle.y,
                      "--particle-size": particle.size,
                      "--particle-duration": particle.duration,
                      "--particle-delay": particle.delay,
                    } as CSSProperties
                  }
                />
              ))}
            </div>
            <div className="machine-reflection" />
          </div>
          <div className="machine-ring machine-ring-outer" />
          <div className="machine-ring machine-ring-inner" />
        </div>
        <div className="machine-base" />

        <div className={`machine-lever ${isSpinning ? "machine-lever-active" : ""}`}>
          <div className="lever-pivot" />
          <div className="lever-arm" />
          <div className="lever-handle" />
        </div>

        <div className="machine-chute">
          <div className="machine-chute-neck" />
          <div className="machine-chute-tube" />
        </div>

        <TombolaOperator
          onActivate={handleOperatorClick}
          drawCount={drawCount}
          isAnimating={isSpinning}
          disabled={!onDraw || isSpinning}
        />
        <div
          className={[
            "machine-draw-ball",
            currentNumber !== null && !isSpinning ? "machine-draw-ball-visible" : "",
            isSpinning ? "machine-draw-ball-hidden" : "",
            currentNumber !== null && !isSpinning ? "machine-draw-ball-pop" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {formattedNumber}
        </div>
      </div>

      <p className="machine-caption">{statusLabel}</p>
    </section>
  );
}
