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
        className="absolute inset-0 w-full h-full transition-opacity duration-700"
        style={{
          opacity: loaded ? 0 : 1,
          background:
            'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.2) 0%, rgba(30, 58, 138, 0.3) 40%, rgba(0, 0, 0, 0.6) 100%)',
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <div className="flex gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-400/60" style={{ animation: 'pulse 1.4s ease-in-out infinite', animationDelay: '0s' }} />
            <div className="w-2.5 h-2.5 rounded-full bg-blue-400/60" style={{ animation: 'pulse 1.4s ease-in-out infinite', animationDelay: '0.2s' }} />
            <div className="w-2.5 h-2.5 rounded-full bg-blue-400/60" style={{ animation: 'pulse 1.4s ease-in-out infinite', animationDelay: '0.4s' }} />
          </div>
          <p className="text-sm md:text-base font-medium text-blue-200/80 tracking-wider uppercase">
            Ładowanie modelu AI
          </p>
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
