import { ReactNode, memo } from 'react';
import FloatingNav from '@/components/FloatingNav';
import ParticleBackground from '@/components/ParticleBackground';
import Chatbot from '@/components/Chatbot';
import useSmoothScroll from '@/hooks/useSmoothScroll';
import useCanonical from '@/hooks/useCanonical';

interface PageLayoutProps {
  children: ReactNode;
  showParticles?: boolean;
  showVideoBackground?: boolean;
}

const PageLayout = memo(({ children }: PageLayoutProps) => {
  useSmoothScroll();
  useCanonical();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Static background gradient - no animation for performance */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.08]"
          style={{
            background: 'radial-gradient(circle, hsl(176 100% 43% / 0.3) 0%, transparent 70%)',
            left: '5%',
            top: '10%',
          }}
        />
        <div 
          className="absolute w-[500px] h-[500px] rounded-full opacity-[0.06]"
          style={{
            background: 'radial-gradient(circle, hsl(190 100% 50% / 0.3) 0%, transparent 70%)',
            right: '10%',
            bottom: '20%',
          }}
        />
      </div>

      {/* Grid pattern overlay - static */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(176 100% 43% / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(176 100% 43% / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />

      <ParticleBackground />
      <FloatingNav />
      
      <main className="relative z-10">
        {children}
      </main>
      
      <Chatbot />
    </div>
  );
});

PageLayout.displayName = 'PageLayout';

export default PageLayout;
