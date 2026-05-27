import { ReactNode, memo, lazy, Suspense, useEffect, useState } from 'react';
import FloatingNav from '@/components/FloatingNav';
import ParticleBackground from '@/components/ParticleBackground';

// Lazy load chatbot — it's not needed for initial paint and adds significant JS
const Chatbot = lazy(() => import('@/components/Chatbot'));
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

  // Defer chatbot mount until after first interaction or idle — keeps JS off the critical path
  const [chatbotReady, setChatbotReady] = useState(false);
  useEffect(() => {
    let cancelled = false;
    const arm = () => { if (!cancelled) setChatbotReady(true); };
    const idle = (window as any).requestIdleCallback as
      | ((cb: () => void, opts?: { timeout: number }) => number)
      | undefined;
    const handle = idle
      ? idle(arm, { timeout: 3500 })
      : window.setTimeout(arm, 3000);
    const onInteract = () => arm();
    window.addEventListener('pointerdown', onInteract, { once: true, passive: true });
    window.addEventListener('keydown', onInteract, { once: true });
    return () => {
      cancelled = true;
      if (idle && (window as any).cancelIdleCallback) (window as any).cancelIdleCallback(handle);
      else clearTimeout(handle as number);
      window.removeEventListener('pointerdown', onInteract);
      window.removeEventListener('keydown', onInteract);
    };
  }, []);

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
      
      {chatbotReady && (
        <Suspense fallback={null}>
          <Chatbot />
        </Suspense>
      )}
    </div>
  );
});

PageLayout.displayName = 'PageLayout';

export default PageLayout;
