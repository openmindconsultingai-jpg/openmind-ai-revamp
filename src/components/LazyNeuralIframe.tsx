import { useEffect, useRef, useState } from 'react';

interface Props {
  className?: string;
  style?: React.CSSProperties;
  title?: string;
}

/**
 * Defers loading of the heavy /openmind-neural-recreated.html iframe
 * until the wrapper enters (or nearly enters) the viewport.
 * Placeholder keeps layout stable and visually matches the dark hero background.
 */
const LazyNeuralIframe = ({ className, style, title = 'OpenMind AI – interaktywna sieć neuronowa' }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (shouldLoad) return;
    if (typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoad(true);
          obs.disconnect();
        }
      },
      { rootMargin: '200px', threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [shouldLoad]);

  return (
    <div ref={ref} className={className} style={style}>
      {shouldLoad ? (
        <iframe
          src="/openmind-neural-recreated.html?v=5"
          title={title}
          loading="lazy"
          className="absolute inset-0 w-full h-full"
          style={{ border: 'none', background: 'transparent', pointerEvents: 'auto', touchAction: 'pan-y' }}
          allow="autoplay"
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 w-full h-full rounded-2xl"
          style={{
            background:
              'radial-gradient(ellipse at center, hsl(176 100% 43% / 0.12) 0%, hsl(220 15% 5% / 0.6) 70%, transparent 100%)',
          }}
        />
      )}
    </div>
  );
};

export default LazyNeuralIframe;
