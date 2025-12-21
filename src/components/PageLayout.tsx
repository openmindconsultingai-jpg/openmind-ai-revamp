import { ReactNode, useEffect, useRef, useState } from 'react';
import FloatingNav from '@/components/FloatingNav';
import CustomCursor from '@/components/CustomCursor';
import Chatbot from '@/components/Chatbot';
import useSmoothScroll from '@/hooks/useSmoothScroll';

interface PageLayoutProps {
  children: ReactNode;
  showParticles?: boolean;
}

const PageLayout = ({ children, showParticles = true }: PageLayoutProps) => {
  useSmoothScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-background relative overflow-hidden">
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

      {/* Noise overlay */}
      <div className="fixed inset-0 pointer-events-none noise-overlay" />

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