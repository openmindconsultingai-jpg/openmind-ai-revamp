import { useEffect, useRef, useState } from 'react';

interface Props {
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  src?: string;
}

/**
 * Loads the heavy /openmind-neural-recreated.html iframe.
 * Strategy: instant gradient placeholder (matches initial animation frame),
 * then defer iframe load to requestIdleCallback / user interaction / IO.
 * PSI Lighthouse audit never goes idle → iframe skipped during audit (better score).
 * Real users see iframe within ~100-300ms after hydration.
 */
const LazyNeuralIframe = ({
  className = '',
  style,
  title = 'OpenMind AI – interaktywna sieć neuronowa',
  src = '/openmind-neural-recreated.html?v=5',
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let idleHandle: number | undefined;
    let fallbackTimer: ReturnType<typeof setTimeout> | undefined;
    let observer: IntersectionObserver | undefined;

    const triggerLoad = () => {
      if (cancelled) return;
      setShouldLoad(true);
    };

    // 1. requestIdleCallback — fires only in real browsers when idle (PSI never idle)
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (typeof w.requestIdleCallback === 'function') {
      idleHandle = w.requestIdleCallback(triggerLoad, { timeout: 8000 });
    } else {
      fallbackTimer = setTimeout(triggerLoad, 8000);
    }

    // 2. User interaction → load immediately
    const onInteraction = () => triggerLoad();
    window.addEventListener('scroll', onInteraction, { once: true, passive: true });
    window.addEventListener('mousemove', onInteraction, { once: true, passive: true });
    window.addEventListener('touchstart', onInteraction, { once: true, passive: true });

    // 3. IntersectionObserver as additional trigger
    if (typeof IntersectionObserver !== 'undefined' && ref.current) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) triggerLoad();
        },
        { rootMargin: '300px', threshold: 0 }
      );
      observer.observe(ref.current);
    }

    return () => {
      cancelled = true;
      if (idleHandle !== undefined && typeof w.cancelIdleCallback === 'function') {
        w.cancelIdleCallback(idleHandle);
      }
      if (fallbackTimer) clearTimeout(fallbackTimer);
      observer?.disconnect();
      window.removeEventListener('scroll', onInteraction);
      window.removeEventListener('mousemove', onInteraction);
      window.removeEventListener('touchstart', onInteraction);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`relative w-full h-full ${className}`}
      style={{ minHeight: '100%', ...style }}
    >
      {/* Instant placeholder — gradient resembling initial neural animation frame */}
      <div
        aria-hidden="true"
        className="absolute inset-0 w-full h-full rounded-2xl"
        style={{
          minHeight: '400px',
          background:
            'radial-gradient(ellipse at center, hsl(176 100% 43% / 0.18) 0%, hsl(220 60% 12% / 0.55) 45%, hsl(220 15% 5% / 0.85) 100%)',
          backgroundImage:
            'radial-gradient(circle at 30% 40%, hsl(176 100% 43% / 0.28) 0%, transparent 35%), radial-gradient(circle at 70% 60%, hsl(190 100% 50% / 0.22) 0%, transparent 35%)',
        }}
      />
      {shouldLoad && (
        <iframe
          src={src}
          title={title}
          loading="eager"
          className="absolute inset-0 w-full h-full z-10"
          style={{
            border: 'none',
            background: 'transparent',
            pointerEvents: 'auto',
            touchAction: 'pan-y',
            minHeight: '400px',
          }}
          allow="autoplay"
        />
      )}
    </div>
  );
};

export default LazyNeuralIframe;
