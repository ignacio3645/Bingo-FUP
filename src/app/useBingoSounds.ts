import { useRef } from "react";

type BrowserAudioContext = AudioContext;

function getAudioContextConstructor() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.AudioContext ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext ?? null;
}

function connectAndStart(
  context: BrowserAudioContext,
  oscillator: OscillatorNode,
  gain: GainNode,
  destination: AudioNode,
) {
  oscillator.connect(gain);
  gain.connect(destination);
  oscillator.start();
}

export function useBingoSounds() {
  const contextRef = useRef<BrowserAudioContext | null>(null);

  const getContext = async () => {
    const AudioContextConstructor = getAudioContextConstructor();

    if (!AudioContextConstructor) {
      return null;
    }

    if (!contextRef.current) {
      contextRef.current = new AudioContextConstructor();
    }

    if (contextRef.current.state === "suspended") {
      await contextRef.current.resume();
    }

    return contextRef.current;
  };

  const playSpin = async (durationMs: number) => {
    const context = await getContext();

    if (!context) {
      return;
    }

    const now = context.currentTime;
    const duration = Math.max(durationMs / 1000, 0.25);
    const end = now + duration;

    const rumble = context.createOscillator();
    rumble.type = "triangle";
    rumble.frequency.setValueAtTime(168, now);
    rumble.frequency.exponentialRampToValueAtTime(124, end);

    const rumbleGain = context.createGain();
    rumbleGain.gain.setValueAtTime(0.0001, now);
    rumbleGain.gain.linearRampToValueAtTime(0.03, now + 0.05);
    rumbleGain.gain.exponentialRampToValueAtTime(0.0001, end + 0.02);

    const whirr = context.createOscillator();
    whirr.type = "sawtooth";
    whirr.frequency.setValueAtTime(290, now);
    whirr.frequency.exponentialRampToValueAtTime(210, end);

    const whirrGain = context.createGain();
    whirrGain.gain.setValueAtTime(0.0001, now);
    whirrGain.gain.linearRampToValueAtTime(0.02, now + 0.03);
    whirrGain.gain.exponentialRampToValueAtTime(0.0001, end + 0.02);

    connectAndStart(context, rumble, rumbleGain, context.destination);
    connectAndStart(context, whirr, whirrGain, context.destination);

    rumble.stop(end + 0.04);
    whirr.stop(end + 0.04);
  };

  const playReveal = async () => {
    const context = await getContext();

    if (!context) {
      return;
    }

    const now = context.currentTime;

    const lead = context.createOscillator();
    lead.type = "sine";
    lead.frequency.setValueAtTime(740, now);
    lead.frequency.exponentialRampToValueAtTime(1180, now + 0.18);

    const leadGain = context.createGain();
    leadGain.gain.setValueAtTime(0.0001, now);
    leadGain.gain.linearRampToValueAtTime(0.08, now + 0.02);
    leadGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.42);

    const sparkle = context.createOscillator();
    sparkle.type = "triangle";
    sparkle.frequency.setValueAtTime(990, now);
    sparkle.frequency.exponentialRampToValueAtTime(1560, now + 0.15);

    const sparkleGain = context.createGain();
    sparkleGain.gain.setValueAtTime(0.0001, now);
    sparkleGain.gain.linearRampToValueAtTime(0.04, now + 0.015);
    sparkleGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);

    connectAndStart(context, lead, leadGain, context.destination);
    connectAndStart(context, sparkle, sparkleGain, context.destination);

    lead.stop(now + 0.45);
    sparkle.stop(now + 0.35);
  };

  return {
    playReveal,
    playSpin,
  };
}
