import { memo, useState, useEffect, useRef } from 'react';
import { useVideoContext } from '@/contexts/VideoContext';

interface VideoSectionBackgroundProps {
  className?: string;
  opacity?: number;
  blurPx?: number;
  overlayOpacity?: number;
}

const VideoSectionBackground = memo(({
  className = '',
  opacity = 0.22,
  blurPx = 8,
  overlayOpacity = 0.78,
}: VideoSectionBackgroundProps) => {
  const { currentVideo, isLoading, nextVideo } = useVideoContext();
  const [isReady, setIsReady] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Reset readiness when video changes
  useEffect(() => {
    setIsReady(false);
    setIsFadingOut(false);
  }, [currentVideo?.url]);

  const handleVideoEnd = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      nextVideo();
    }, 1500);
  };

  if (isLoading || !currentVideo) return null;

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <video
        ref={videoRef}
        key={currentVideo.url}
        autoPlay
        muted
        playsInline
        onCanPlay={() => setIsReady(true)}
        onEnded={handleVideoEnd}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          opacity: isFadingOut ? 0 : (isReady ? opacity : 0),
          filter: `blur(${blurPx}px)`,
          transform: 'scale(1.1)',
          transition: 'opacity 1.5s ease-out',
        }}
      >
        <source src={currentVideo.url} type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div 
        className="absolute inset-0 bg-background" 
        style={{ opacity: overlayOpacity }} 
      />

      {/* Cinematic grain - static */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
        }}
      />
    </div>
  );
});

VideoSectionBackground.displayName = 'VideoSectionBackground';

export default VideoSectionBackground;
