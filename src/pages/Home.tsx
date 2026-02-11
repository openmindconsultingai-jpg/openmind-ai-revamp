import { lazy, Suspense } from 'react';
import VideoHero from '@/components/VideoHero';
import FloatingNav from '@/components/FloatingNav';

import useSmoothScroll from '@/hooks/useSmoothScroll';

// Lazy load below-the-fold sections for better FCP/LCP
const MissionSection = lazy(() => import('@/components/MissionSection'));
const BentoGrid = lazy(() => import('@/components/BentoGrid'));
const ParticleFooter = lazy(() => import('@/components/ParticleFooter'));
const Chatbot = lazy(() => import('@/components/Chatbot'));

const Home = () => {
  useSmoothScroll();

  return (
    <div className="min-h-screen bg-background">
      
      <FloatingNav />
      <VideoHero />
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <MissionSection />
        <BentoGrid />
        <ParticleFooter />
        <Chatbot />
      </Suspense>
    </div>
  );
};

export default Home;