import { useEffect, useMemo, useState } from 'react';
import { useHeroVideos } from '@/hooks/useHeroVideos';

interface VideoSectionBackgroundProps {
  seed?: string;
  className?: string;
  opacity?: number;
  blurPx?: number;
  overlayOpacity?: number;
}

const hashStringToIndex = (value: string, mod: number) => {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % mod;
};

const VideoSectionBackground = ({
  seed = 'default',
  className = '',
  opacity = 0.18,
  blurPx = 10,
  overlayOpacity = 0.82,
}: VideoSectionBackgroundProps) => {
  const { videos, isLoading } = useHeroVideos();
  const [isReady, setIsReady] = useState(false);

  const selected = useMemo(() => {
    if (!videos.length) return null;
    const idx = hashStringToIndex(seed, videos.length);
    return videos[idx];
  }, [seed, videos]);

  // If the list changes (first load), reset readiness for clean fade-in
  useEffect(() => {
    setIsReady(false);
  }, [selected?.url]);

  if (isLoading || !selected) return null;

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <video
        key={selected.url}
        autoPlay
        muted
        loop
        playsInline
        onCanPlay={() => setIsReady(true)}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          opacity: isReady ? opacity : 0,
          filter: `blur(${blurPx}px)`,
          transform: 'scale(1.1)',
          transition: 'opacity 900ms ease-out',
        }}
      >
        <source src={selected.url} type="video/mp4" />
      </video>

      {/* Dark overlay to keep typography readable */}
      <div className="absolute inset-0 bg-background" style={{ opacity: overlayOpacity }} />

      {/* Cinematic grain */}
      <div className="absolute inset-0 noise-overlay" />
    </div>
  );
};

export default VideoSectionBackground;
