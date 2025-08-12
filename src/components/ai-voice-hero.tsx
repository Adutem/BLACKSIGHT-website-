import React, { useEffect, useMemo, useRef, useState } from "react";
import { Play, Pause, Square } from "lucide-react";

type AiVoiceHeroProps = {
  headline?: string;
  subline?: string;
  buttonLabel?: string;
  speechText?: string;
  lang?: string;
};

/**
 * AiVoiceHero
 * - Plain React + Tailwind component that matches the provided design.
 * - Uses the Web Speech API (speechSynthesis) to play a short demo message.
 * - Canvas-based dotted waveform animation. During speaking, the animation intensifies.
 *
 * Requirements:
 * - Tailwind CSS available in your app.
 * - Optional: lucide-react for icons: npm i lucide-react
 *
 * Usage:
 *   <AiVoiceHero />
 */
export default function AiVoiceHero({
  headline = "Nova Increased Customer Interaction by 60%",
  subline = "Supports Multiple Languages Available 24/7",
  buttonLabel = "Listen to AI demo test",
  speechText = "Hello! I am your AI assistant. I can speak multiple languages and I am available twenty four seven. How can I help you today?",
  lang = "en-US",
}: AiVoiceHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [totalChars, setTotalChars] = useState(0);
  const [speechSupported, setSpeechSupported] = useState<boolean>(
    () => typeof window !== "undefined" && "speechSynthesis" in window
  );

  const reducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  // Load voices (Chrome loads them asynchronously)
  useEffect(() => {
    const loadVoices = () => {
      const v = window.speechSynthesis?.getVoices?.() ?? [];
      setVoices(v);
    };
    loadVoices();
    if (typeof window !== "undefined") {
      window.speechSynthesis?.addEventListener?.("voiceschanged", loadVoices);
      return () =>
        window.speechSynthesis?.removeEventListener?.("voiceschanged", loadVoices);
    }
  }, []);

  // Cleanup speech synthesis on unmount
  useEffect(() => {
    return () => {
      try {
        window.speechSynthesis?.cancel();
      } catch {}
    };
  }, []);

  // Pick a voice matching preferred lang when possible
  const pickVoice = () => {
    if (!voices.length) return null;
    const exact = voices.find((v) => v.lang?.toLowerCase() === lang.toLowerCase());
    if (exact) return exact;
    const base = lang.split("-")[0].toLowerCase();
    const partial = voices.find((v) => v.lang?.toLowerCase().startsWith(base));
    return partial ?? voices[0];
  };

  // Speech synthesis handler
  function startSpeech() {
    if (!speechSupported) return;
    window.speechSynthesis.cancel();

    const text = speechText;
    const utter = new SpeechSynthesisUtterance(text);
    utterRef.current = utter;

    const voice = pickVoice();
    if (voice) utter.voice = voice;
    utter.lang = voice?.lang ?? lang;
    utter.rate = 1.0;
    utter.pitch = 1.0;
    utter.volume = 1.0;

    setTotalChars(text.length);
    setCharIndex(0);

    utter.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };
    utter.onboundary = (e: SpeechSynthesisEvent) => {
      if (typeof e.charIndex === "number") {
        setCharIndex(e.charIndex);
      }
    };
    utter.onpause = () => setIsPaused(true);
    utter.onresume = () => setIsPaused(false);
    utter.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      utterRef.current = null;
    };
    utter.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      utterRef.current = null;
      setCharIndex(totalChars);
    };

    window.speechSynthesis.speak(utter);
  }

  function handleTogglePlay() {
    if (!speechSupported) return;

    if (!isSpeaking) {
      startSpeech();
      return;
    }

    if (isSpeaking && !isPaused) {
      try {
        window.speechSynthesis.pause();
        setIsPaused(true);
      } catch {}
      return;
    }

    if (isSpeaking && isPaused) {
      try {
        window.speechSynthesis.resume();
        setIsPaused(false);
      } catch {}
      return;
    }
  }

  function handleStop() {
    try {
      window.speechSynthesis.cancel();
    } catch {}
    setIsSpeaking(false);
    setIsPaused(false);
    utterRef.current = null;
  }

  // Canvas dotted waveform animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.clientWidth;
    let height = canvas.clientHeight;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.scale(dpr, dpr);

    const onResize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      const dpr2 = window.devicePixelRatio || 1;
      canvas.width = Math.floor(width * dpr2);
      canvas.height = Math.floor(height * dpr2);
      ctx.resetTransform();
      ctx.scale(dpr2, dpr2);
    };

    // Observe canvas resize if ResizeObserver is available
    if (typeof window !== "undefined" && "ResizeObserver" in window) {
      resizeObserverRef.current = new window.ResizeObserver(() => {
        onResize();
      });
      resizeObserverRef.current.observe(canvas);
    }

    const columns = 120; // number of vertical "spikes"
    const verticalDots = 26; // dots per column
    const paddingX = 24;
    const paddingY = 10;

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }
    function hsvToRgb(h: number, s: number, v: number) {
      let r = 0,
        g = 0,
        b = 0;
      const i = Math.floor(h * 6);
      const f = h * 6 - i;
      const p = v * (1 - s);
      const q = v * (1 - f * s);
      const t_ = v * (1 - (1 - f) * s);
      switch (i % 6) {
        case 0:
          r = v;
          g = t_;
          b = p;
          break;
        case 1:
          r = q;
          g = v;
          b = p;
          break;
        case 2:
          r = p;
          g = v;
          b = t_;
          break;
        case 3:
          r = p;
          g = q;
          b = v;
          break;
        case 4:
          r = t_;
          g = p;
          b = v;
          break;
        case 5:
          r = v;
          g = p;
          b = q;
          break;
      }
      return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
    }

    let t = 0;
    const baseSpeed = 0.015;
    const speakBoost = 0.025;

    const render = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      const innerW = Math.max(0, width - paddingX * 2);
      const innerH = Math.max(0, height - paddingY * 2);

      const grad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        innerH * 0.1,
        width / 2,
        height / 2,
        innerH * 0.8
      );
      grad.addColorStop(0, "rgba(59,130,246,0.04)");
      grad.addColorStop(1, "rgba(59,130,246,0.00)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      const speed = (reducedMotion ? 0 : baseSpeed) + (isSpeaking && !isPaused ? speakBoost : 0);
      t += speed;

      for (let i = 0; i < columns; i++) {
        const xNorm = i / (columns - 1);
        const x = paddingX + xNorm * innerW;

        const env = Math.sin(Math.PI * xNorm);
        const wave =
          Math.sin((xNorm * 6 + t) * Math.PI) * 0.55 +
          Math.sin((xNorm * 12 - t * 1.2) * Math.PI) * 0.25 +
          Math.sin((xNorm * 20 + t * 0.7) * Math.PI) * 0.2;

        const speakingAmp = isSpeaking ? 1.0 : 0.7;
        const amp = Math.max(0.02, Math.abs(wave) * env * speakingAmp);

        const dotsInColumn = Math.max(4, Math.floor(amp * verticalDots) + 6);

        const hue = lerp(300 / 360, 190 / 360, xNorm);
        const color = hsvToRgb(hue, 0.5, 0.9);

        const centerY = height / 2;
        const spacing = (innerH / verticalDots) * 0.9;
        const radiusBase = Math.min(2.2, Math.max(1.2, (innerH / 300) * 1.6));
        ctx.fillStyle = color;

        for (let j = 0; j < dotsInColumn; j++) {
          const rel = j / (dotsInColumn - 1);
          const size =
            radiusBase *
            (1 + 0.8 * Math.cos(rel * Math.PI)) *
            (0.9 + (isSpeaking ? 0.25 : 0.0) * Math.sin(t * 2 + i * 0.08));

          const yOffset = (j - (dotsInColumn - 1) / 2) * spacing;
          const y = centerY + yOffset;

          ctx.globalAlpha = 0.85 - Math.abs(rel - 0.5) * 0.7;
          ctx.beginPath();
          ctx.arc(x, y, Math.max(0.8, size), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (resizeObserverRef.current) resizeObserverRef.current.disconnect();
    };
  }, [isSpeaking, isPaused, reducedMotion]);

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <h2 className="text-center text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900">
          {headline}
        </h2>

        <p className="mt-4 text-center text-sm sm:text-base text-zinc-600">
          {subline.split("24/7")[0]}
          <span className="text-blue-500 font-medium">24/7</span>
          {subline.split("24/7")[1] ?? ""}
        </p>

        <div className="mt-8 sm:mt-10">
          <div className="relative mx-auto max-w-3xl">
            <div
              className="pointer-events-none absolute inset-0 rounded-[28px] bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0.04),rgba(15,23,42,0)_70%)]"
              aria-hidden="true"
            />
            <canvas
              ref={canvasRef}
              className="relative block h-[180px] w-full rounded-[28px] bg-transparent"
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleTogglePlay}
              className={[
                "inline-flex items-center gap-2 rounded-full",
                "bg-blue-500 px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-white",
                "shadow-sm shadow-blue-600/30 hover:bg-blue-700 active:bg-blue-700",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                "transition-colors",
                !speechSupported ? "opacity-60 cursor-not-allowed" : "",
              ].join(" ")}
              aria-pressed={isSpeaking && !isPaused}
              disabled={!speechSupported}
            >
              {(!isSpeaking || isPaused) ? (
                <Play className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Pause className="h-4 w-4" aria-hidden="true" />
              )}
              {(!isSpeaking || isPaused) ? (isPaused ? "Resume demo" : buttonLabel) : "Pause demo"}
            </button>

            {isSpeaking && (
              <button
                type="button"
                onClick={handleStop}
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-900 border border-gray-200 hover:bg-gray-50 active:bg-gray-100 transition-colors"
              >
                <Square className="h-4 w-4" aria-hidden="true" />
                Stop
              </button>
            )}
          </div>

          {isSpeaking && (
            <div className="w-full max-w-md">
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-blue-500 transition-[width] duration-200"
                  style={{ width: totalChars > 0 ? `${Math.min(100, Math.round((charIndex / totalChars) * 100))}%` : "0%" }}
                />
              </div>
              <div className="mt-1 text-center text-xs text-gray-500" aria-live="polite">
                {isPaused ? "Paused" : "Speaking…"}
              </div>
            </div>
          )}

          {!speechSupported && (
            <p className="text-xs text-red-600">Speech synthesis is not supported in this browser.</p>
          )}
        </div>

        <p className="sr-only" aria-live="polite">
          {!speechSupported
            ? "Speech not supported."
            : isSpeaking
            ? isPaused
              ? "AI demo is paused."
              : "AI demo is playing."
            : "AI demo is stopped."}
        </p>
      </div>
    </section>
  );
}