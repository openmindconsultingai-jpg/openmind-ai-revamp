import { lazy, Suspense } from 'react';
import VideoHero from '@/components/VideoHero';
import FloatingNav from '@/components/FloatingNav';

import useSmoothScroll from '@/hooks/useSmoothScroll';
import useCanonical from '@/hooks/useCanonical';

// Lazy load below-the-fold sections for better FCP/LCP
const MissionSection = lazy(() => import('@/components/MissionSection'));
const BentoGrid = lazy(() => import('@/components/BentoGrid'));
const ServiceAreas = lazy(() => import('@/components/ServiceAreas'));
const ParticleFooter = lazy(() => import('@/components/ParticleFooter'));
const Chatbot = lazy(() => import('@/components/Chatbot'));

const Home = () => {
  useSmoothScroll();
  useCanonical();

  return (
    <div className="min-h-screen bg-background">
      
      <FloatingNav />
      <VideoHero />
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <MissionSection />
        <BentoGrid />
        <ServiceAreas />
        <ParticleFooter />
        <Chatbot />
      </Suspense>
    </div>
  );
};

export default Home;