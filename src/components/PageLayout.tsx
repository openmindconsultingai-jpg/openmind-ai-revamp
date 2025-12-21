import { ReactNode, useEffect, useRef, useState } from 'react';
import FloatingNav from '@/components/FloatingNav';
import CustomCursor from '@/components/CustomCursor';
import Chatbot from '@/components/Chatbot';
import useSmoothScroll from '@/hooks/useSmoothScroll';
import { useVideoContext } from '@/contexts/VideoContext';

interface PageLayoutProps {
  children: ReactNode;
  showParticles?: boolean;
  showVideoBackground?: boolean;
}

const PageLayout = ({ children, showParticles = true, showVideoBackground = true }: PageLayoutProps) => {
  useSmoothScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { currentVideo, isLoading, nextVideo } = useVideoContext();
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Reset video ready state when video changes
  useEffect(() => {
    setIsVideoReady(false);
    setIsFadingOut(false);
  }, [currentVideo?.url]);

  const handleVideoEnd = () => {
    // Start 2s fade out, then switch video
    setIsFadingOut(true);
    setTimeout(() => {
      nextVideo();
    }, 2000);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-background relative overflow-hidden">
      {/* Video Background for subpages - sequential playback */}
      {showVideoBackground && currentVideo && (
        <div className="fixed inset-0 overflow-hidden">
          <video
            key={currentVideo.url}
            autoPlay
            muted
            playsInline
            onCanPlay={() => setIsVideoReady(true)}
            onEnded={handleVideoEnd}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: isFadingOut ? 0 : (isVideoReady ? 0.35 : 0),
              filter: 'blur(6px)',
              transition: 'opacity 2000ms ease-in-out',
            }}
          >
            <source src={currentVideo.url} type="video/mp4" />
          </video>
          
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-background/70" />
          
          {/* Noise overlay */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              opacity: 0.05,
              mixBlendMode: 'overlay',
            }}
          />
        </div>
      )}

      {/* Animated Background Orbs */}
      {showParticles && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div 
            className="absolute w-[600px] h-[600px] rounded-full opacity-20"
            style={{
              background: 'radial-gradient(circle, hsl(176 100% 43% / 0.3) 0%, transparent 70%)',
              left: '5%',
              top: '10%',
              transform: `translate(${(mousePosition.x - 0.5) * -20}px, ${(mousePosition.y - 0.5) * -20}px)`,
              transition: 'transform 0.5s ease-out',
            }}
          />
          <div 
            className="absolute w-[500px] h-[500px] rounded-full opacity-15"
            style={{
              background: 'radial-gradient(circle, hsl(190 100% 50% / 0.3) 0%, transparent 70%)',
              right: '10%',
              bottom: '20%',
              transform: `translate(${(mousePosition.x - 0.5) * 30}px, ${(mousePosition.y - 0.5) * 30}px)`,
              transition: 'transform 0.5s ease-out',
            }}
          />
        </div>
      )}

      {/* Grid pattern overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(176 100% 43% / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(176 100% 43% / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />

      <CustomCursor enabled={typeof window !== 'undefined' && window.innerWidth > 768} />
      <FloatingNav />
      
      <main className="relative z-10">
        {children}
      </main>
      
      <Chatbot />
    </div>
  );
};

export default PageLayout;