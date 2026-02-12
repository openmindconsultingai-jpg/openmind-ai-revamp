import { lazy, Suspense, useMemo } from 'react';
import VideoHero from '@/components/VideoHero';
import FloatingNav from '@/components/FloatingNav';

import useSmoothScroll from '@/hooks/useSmoothScroll';
import useCanonical from '@/hooks/useCanonical';
import usePageMeta from '@/hooks/usePageMeta';

// Lazy load below-the-fold sections for better FCP/LCP
const MissionSection = lazy(() => import('@/components/MissionSection'));
const BentoGrid = lazy(() => import('@/components/BentoGrid'));
const ServiceAreas = lazy(() => import('@/components/ServiceAreas'));
const ParticleFooter = lazy(() => import('@/components/ParticleFooter'));
const Chatbot = lazy(() => import('@/components/Chatbot'));

const Home = () => {
  useSmoothScroll();
  useCanonical();

  const jsonLd = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'OpenMind AI Consulting',
    url: 'https://openmindai.pl',
    logo: 'https://storage.googleapis.com/gpt-engineer-file-uploads/hL5DHSK2kPP5D5kfMFPItZpWWjm1/uploads/1759531603114-Open_Mind-min[1].png',
    description: 'Szkolenia AI, wdrożenia sztucznej inteligencji, agencja kreatywna AI, automatyzacja procesów i doradztwo strategiczne dla firm w Polsce.',
    address: { '@type': 'PostalAddress', addressCountry: 'PL' },
    sameAs: ['https://twitter.com/OpenMindAI_PL'],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['Polish', 'English'],
    },
  }), []);

  usePageMeta({
    title: 'OpenMind AI – Szkolenia AI, Wdrożenia, Agencja Kreatywna | Polska',
    description: 'Szkolenia AI, wdrożenia sztucznej inteligencji, automatyzacja procesów, produkcja wideo i grafik AI, chatboty, doradztwo strategiczne. Kompleksowa transformacja cyfrowa dla firm w całej Polsce. RODO. Bezpłatna konsultacja.',
    keywords: 'szkolenia AI, wdrożenia AI, sztuczna inteligencja, automatyzacja procesów, agencja kreatywna AI, chatbot AI, doradztwo AI, transformacja cyfrowa, kursy AI, machine learning, generatywna AI, produkcja wideo AI, OpenMind AI, Polska',
    path: '/',
    jsonLd,
  });

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
