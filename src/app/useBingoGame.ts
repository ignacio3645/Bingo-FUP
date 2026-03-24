import { useEffect, useRef, useReducer } from "react";
import {
  canDrawNumber,
  canFinishSession,
  canPauseSession,
  canResumeSession,
  canStartSession,
  createSession,
  drawNextNumber,
  finishSession,
  getRemainingCount,
  pauseSession,
  resetSession,
  resumeSession,
  startSession,
} from "../domain/bingo/game";
import type { BingoSession } from "../domain/bingo/types";
import { useBingoSounds } from "./useBingoSounds";

interface BingoGameOptions {
  animationDurationMs?: number;
  now?: () => string;
  random?: () => number;
}

interface BingoGameState {
  isAnimating: boolean;
  revealedCurrentNumber: number | null;
  revealedDrawCount: number;
  session: BingoSession;
}

type BingoGameAction =
  | { type: "start"; timestamp: string }
  | { type: "draw"; timestamp: string; randomValue: number }
  | { type: "pause"; timestamp: string }
  | { type: "resume"; timestamp: string }
  | { type: "finish"; timestamp: string }
  | { type: "reset"; timestamp: string }
  | { type: "animation-complete" };

function gameReducer(state: BingoGameState, action: BingoGameAction): BingoGameState {
  switch (action.type) {
    case "start":
      if (!canStartSession(state.session.status)) {
        return state;
      }
      return {
        ...state,
        revealedCurrentNumber: null,
        revealedDrawCount: 0,
        session: startSession(state.session, action.timestamp),
      };
    case "draw":
      if (!canDrawNumber(state.session)) {
        return state;
      }
      return {
        isAnimating: true,
        revealedCurrentNumber: state.revealedCurrentNumber,
        revealedDrawCount: state.revealedDrawCount,
        session: drawNextNumber(state.session, action.randomValue, action.timestamp),
      };
    case "pause":
      if (!canPauseSession(state.session.status)) {
        return state;
      }
      return {
        ...state,
        revealedCurrentNumber: state.revealedCurrentNumber,
        revealedDrawCount: state.revealedDrawCount,
        session: pauseSession(state.session, action.timestamp),
      };
    case "resume":
      if (!canResumeSession(state.session.status)) {
        return state;
      }
      return {
        ...state,
        revealedCurrentNumber: state.revealedCurrentNumber,
        revealedDrawCount: state.revealedDrawCount,
        session: resumeSession(state.session, action.timestamp),
      };
    case "finish":
      if (!canFinishSession(state.session.status)) {
        return state;
      }
      return {
        ...state,
        revealedCurrentNumber: state.revealedCurrentNumber,
        revealedDrawCount: state.revealedDrawCount,
        session: finishSession(state.session, action.timestamp),
      };
    case "reset":
      return {
        isAnimating: false,
        revealedCurrentNumber: null,
        revealedDrawCount: 0,
        session: resetSession(state.session, action.timestamp),
      };
    case "animation-complete":
      return {
        ...state,
        isAnimating: false,
        revealedCurrentNumber: state.session.currentNumber,
        revealedDrawCount: state.session.drawnNumbers.length,
      };
    default:
      return state;
  }
}

export function useBingoGame({
  animationDurationMs = 1400,
  now = () => new Date().toISOString(),
  random = () => Math.random(),
}: BingoGameOptions = {}) {
  const sounds = useBingoSounds();
  const [state, dispatch] = useReducer(gameReducer, undefined, () => ({
    isAnimating: false,
    revealedCurrentNumber: null,
    revealedDrawCount: 0,
    session: createSession(now()),
  }));
  const previousRevealedDrawCountRef = useRef(0);

  useEffect(() => {
    if (!state.isAnimating) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      dispatch({ type: "animation-complete" });
    }, animationDurationMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [animationDurationMs, state.isAnimating]);

  useEffect(() => {
    if (state.revealedDrawCount > previousRevealedDrawCountRef.current) {
      void sounds.playReveal();
    }

    previousRevealedDrawCountRef.current = state.revealedDrawCount;
  }, [sounds, state.revealedDrawCount]);

  const start = () => {
    dispatch({ type: "start", timestamp: now() });
  };

  const draw = () => {
    if (state.isAnimating) {
      return;
    }

    void sounds.playSpin(animationDurationMs);
    dispatch({
      type: "draw",
      timestamp: now(),
      randomValue: random(),
    });
  };

  const pause = () => {
    dispatch({ type: "pause", timestamp: now() });
  };

  const resume = () => {
    dispatch({ type: "resume", timestamp: now() });
  };

  const finish = () => {
    dispatch({ type: "finish", timestamp: now() });
  };

  const reset = () => {
    dispatch({ type: "reset", timestamp: now() });
  };

  const primaryAction =
    state.session.status === "pending"
      ? { label: "Iniciar juego", onClick: start, disabled: state.isAnimating }
      : state.session.status === "active"
        ? {
            label: state.isAnimating ? "Sorteando..." : "Sortear siguiente",
            onClick: draw,
            disabled: state.isAnimating || getRemainingCount(state.session) === 0,
          }
        : state.session.status === "paused"
          ? { label: "Reanudar juego", onClick: resume, disabled: state.isAnimating }
          : { label: "Partida finalizada", onClick: finish, disabled: true };

  return {
    ...state,
    remainingCount: getRemainingCount(state.session),
    revealedDrawnNumbers: state.session.drawnNumbers.slice(0, state.revealedDrawCount),
    canPause: canPauseSession(state.session.status) && !state.isAnimating,
    canResume: canResumeSession(state.session.status) && !state.isAnimating,
    canFinish: canFinishSession(state.session.status) && !state.isAnimating,
    pause,
    primaryAction,
    reset,
    finish,
  };
}
