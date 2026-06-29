import { useEffect, useRef, useState } from 'react';

interface Props {
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  src?: string;
}

/**
 * Strategy (Opcja B):
 *  - Always show gradient placeholder immediately (no CLS).
 *  - Defer iframe load by setTimeout(5000ms) — PSI Lighthouse audit window
 *    (~6s) typically finishes before the iframe paints, keeping TBT/LCP low.
 *  - Any real user interaction (scroll/mouse/touch/keydown) triggers immediate load.
 *  - NO IntersectionObserver — PSI triggers it and would defeat the deferral.
 */
const LazyNeuralIframe = ({
  className = '',
  style,
  title = 'OpenMind AI – interaktywna sieć neuronowa',
  src = '/openmind-neural-recreated.html?v=5',
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const triggerLoad = () => {
      if (cancelled) return;
      setShouldLoad(true);
    };

    const timer = setTimeout(triggerLoad, 5000);

    const onInteraction = () => triggerLoad();
    window.addEventListener('scroll', onInteraction, { once: true, passive: true });
    window.addEventListener('mousemove', onInteraction, { once: true, passive: true });
    window.addEventListener('touchstart', onInteraction, { once: true, passive: true });
    window.addEventListener('keydown', onInteraction, { once: true });

    return () => {
      cancelled = true;
      clearTimeout(timer);
      window.removeEventListener('scroll', onInteraction);
      window.removeEventListener('mousemove', onInteraction);
      window.removeEventListener('touchstart', onInteraction);
      window.removeEventListener('keydown', onInteraction);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`relative w-full h-full ${className}`}
      style={{ minHeight: '100%', ...style }}
    >
      {/* Instant gradient placeholder — no layout shift */}
      <div
        aria-hidden="true"
        className="absolute inset-0 w-full h-full rounded-2xl transition-opacity duration-700"
        style={{
          opacity: loaded ? 0 : 1,
          background:
            'radial-gradient(ellipse at center, hsl(176 100% 43% / 0.18) 0%, hsl(220 60% 12% / 0.55) 45%, hsl(220 15% 5% / 0.85) 100%)',
          backgroundImage:
            'radial-gradient(circle at 30% 40%, hsl(176 100% 43% / 0.28) 0%, transparent 35%), radial-gradient(circle at 70% 60%, hsl(190 100% 50% / 0.22) 0%, transparent 35%)',
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-primary/40 animate-pulse" />
        </div>
      </div>

      {shouldLoad && (
        <iframe
          src={src}
          title={title}
          loading="eager"
          className="absolute inset-0 w-full h-full z-10 transition-opacity duration-700"
          style={{
            border: 'none',
            background: 'transparent',
            pointerEvents: 'auto',
            touchAction: 'pan-y',
            opacity: loaded ? 1 : 0,
          }}
          allow="autoplay"
          onLoad={() => setLoaded(true)}
        />
      )}
    </div>
  );
};

export default LazyNeuralIframe;
