import { useEffect, useRef, useState } from 'react';

interface Props {
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  src?: string;
}

/**
 * Loads the heavy /openmind-neural-recreated.html iframe.
 * Hero is above-the-fold, so we GUARANTEE load via a 100ms timeout,
 * with IntersectionObserver as an early-trigger fallback.
 */
const LazyNeuralIframe = ({
  className,
  style,
  title = 'OpenMind AI – interaktywna sieć neuronowa',
  src = '/openmind-neural-recreated.html?v=5',
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Guaranteed load — hero is above the fold
    const timer = setTimeout(() => setShouldLoad(true), 100);

    let observer: IntersectionObserver | undefined;
    if (typeof IntersectionObserver !== 'undefined' && ref.current) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            setShouldLoad(true);
            observer?.disconnect();
          }
        },
        { rootMargin: '500px', threshold: 0 }
      );
      observer.observe(ref.current);
    }

    return () => {
      clearTimeout(timer);
      observer?.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className={className} style={{ minHeight: '100%', ...style }}>
      {shouldLoad ? (
        <iframe
          src={src}
          title={title}
          loading="eager"
          className="absolute inset-0 w-full h-full"
          style={{ border: 'none', background: 'transparent', pointerEvents: 'auto', touchAction: 'pan-y', minHeight: '400px' }}
          allow="autoplay"
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 w-full h-full rounded-2xl animate-pulse"
          style={{
            minHeight: '400px',
            background:
              'radial-gradient(ellipse at center, hsl(176 100% 43% / 0.12) 0%, hsl(220 15% 5% / 0.6) 70%, transparent 100%)',
          }}
        />
      )}
    </div>
  );
};

export default LazyNeuralIframe;
