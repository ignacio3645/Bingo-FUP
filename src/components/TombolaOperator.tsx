import { useEffect, useMemo, useRef, useState } from "react";

interface TombolaOperatorProps {
  onActivate?: () => void;
  isAnimating?: boolean;
  disabled?: boolean;
  drawCount?: number;
}

type AvatarModuleMap = Record<string, string>;

const avatarModules = import.meta.glob("../assets/*.{png,jpg,jpeg,webp,avif,svg}", {
  eager: true,
  import: "default",
}) as AvatarModuleMap;

const avatarOptions = Object.entries(avatarModules)
  .sort(([leftPath], [rightPath]) => leftPath.localeCompare(rightPath))
  .map(([path, src], index) => {
    const filename = path.split("/").at(-1)?.replace(/\.[^.]+$/, "") ?? `avatar-${index + 1}`;
    const label = filename.replace(/[-_]+/g, " ");

    return {
      src,
      label,
    };
  });

export function TombolaOperator({
  onActivate,
  isAnimating = false,
  disabled = false,
  drawCount = 0,
}: TombolaOperatorProps) {
  const [isPushing, setIsPushing] = useState(false);
  const [avatarIndex, setAvatarIndex] = useState(0);
  const currentAvatar = avatarOptions[avatarIndex];
  const previousDrawCountRef = useRef(drawCount);

  const avatarButtonLabel = useMemo(() => {
    if (!currentAvatar) {
      return "Operador de la tombola";
    }

    return `Sortear numero con avatar ${currentAvatar.label}`;
  }, [currentAvatar]);

  const handleClick = () => {
    if (!disabled && !isAnimating && onActivate) {
      setIsPushing(true);
      onActivate();
      window.setTimeout(() => setIsPushing(false), 400);
    }
  };

  const handleAvatarChange = () => {
    if (avatarOptions.length > 1) {
      setAvatarIndex((currentIndex) => (currentIndex + 1) % avatarOptions.length);
    }
  };

  useEffect(() => {
    if (
      avatarOptions.length > 1 &&
      drawCount > previousDrawCountRef.current &&
      drawCount % 5 === 0
    ) {
      setAvatarIndex((currentIndex) => (currentIndex + 1) % avatarOptions.length);
    }

    previousDrawCountRef.current = drawCount;
  }, [drawCount]);

  return (
    <div className="tombola-operator-wrap">
      <button
        className={`tombola-operator ${isAnimating ? "animating" : ""} ${isPushing ? "pushing" : ""} ${disabled ? "disabled" : ""}`}
        onClick={handleClick}
        type="button"
        aria-label={avatarButtonLabel}
        aria-disabled={disabled}
        disabled={disabled}
      >
        {currentAvatar ? (
          <img
            src={currentAvatar.src}
            alt={currentAvatar.label}
            className="operator-avatar-image"
            draggable="false"
          />
        ) : (
          <span className="operator-avatar-fallback" aria-hidden="true">
            ?
          </span>
        )}
      </button>

      <button
        className="avatar-switcher-button"
        onClick={handleAvatarChange}
        type="button"
        disabled={avatarOptions.length <= 1}
        aria-label="Cambiar avatar"
      >
        Cambiar avatar
      </button>
    </div>
  );
}
