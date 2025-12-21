import { useState, useEffect, useRef } from 'react';
import { useVideoContext } from '@/contexts/VideoContext';

interface VideoSectionBackgroundProps {
  seed?: string;
  className?: string;
  opacity?: number;
  blurPx?: number;
  overlayOpacity?: number;
  scrollFade?: boolean;
}

const VideoSectionBackground = ({
  seed = 'default',
  className = '',
  opacity = 0.18,
  blurPx = 10,
  overlayOpacity = 0.82,
  scrollFade = true,
}: VideoSectionBackgroundProps) => {
  const { getVideoForSection, isLoading } = useVideoContext();
  const [isReady, setIsReady] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = getVideoForSection(seed);

  // Reset readiness when video changes
  useEffect(() => {
    setIsReady(false);
  }, [selected?.url]);

  // Scroll-based crossfade effect
  useEffect(() => {
    if (!scrollFade || !containerRef.current) return;

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate visibility ratio (1 = fully visible, 0 = fully out of view)
      const visibleTop = Math.max(0, Math.min(windowHeight, rect.bottom));
      const visibleBottom = Math.max(0, Math.min(windowHeight, windowHeight - rect.top));
      const visibleHeight = Math.min(visibleTop, visibleBottom, rect.height);
      const visibilityRatio = Math.max(0, Math.min(1, visibleHeight / Math.min(rect.height, windowHeight)));

      // Smooth fade in/out based on scroll position
      setScrollOpacity(visibilityRatio);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollFade]);

  if (isLoading || !selected) return null;

  const finalOpacity = isReady ? opacity * scrollOpacity : 0;

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      <video
        key={selected.url}
        autoPlay
        muted
        loop
        playsInline
        onCanPlay={() => setIsReady(true)}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          opacity: finalOpacity,
          filter: `blur(${blurPx}px)`,
          transform: 'scale(1.1)',
          transition: 'opacity 600ms ease-out',
          willChange: 'opacity',
        }}
      >
        <source src={selected.url} type="video/mp4" />
      </video>

      {/* Dark overlay to keep typography readable */}
      <div 
        className="absolute inset-0 bg-background transition-opacity duration-500" 
        style={{ opacity: overlayOpacity }} 
      />

      {/* Cinematic grain */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: 0.05,
          mixBlendMode: 'overlay',
        }}
      />
    </div>
  );
};

export default VideoSectionBackground;
