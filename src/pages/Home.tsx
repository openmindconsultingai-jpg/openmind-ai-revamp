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
const SeoContentSections = lazy(() => import('@/components/SeoContentSections'));
const Chatbot = lazy(() => import('@/components/Chatbot'));

const Home = () => {
  useSmoothScroll();
  useCanonical();

  const jsonLd = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'OpenMind AI Consulting',
    description: 'Polski lider wdrożeń sztucznej inteligencji dla firm, agencji marketingowych i szkół. Konsulting AI, szkolenia z ChatGPT, Claude, Copilot i Gemini, automatyzacja procesów biznesowych.',
    url: 'https://openmindai.pl',
    areaServed: { '@type': 'Country', name: 'Polska' },
    serviceType: [
      'Wdrożenia AI',
      'Szkolenia AI',
      'Konsulting sztuczna inteligencja',
      'Automatyzacja procesów',
      'AI dla szkół',
    ],
    priceRange: '$$',
    knowsAbout: [
      'ChatGPT', 'Claude', 'Gemini', 'Microsoft Copilot',
      'Midjourney', 'ElevenLabs', 'Runway', 'Azure OpenAI',
    ],
  }), []);

  usePageMeta({
    title: 'OpenMind AI Consulting — Wdrożenia AI, szkolenia i konsulting dla firm i szkół w Polsce',
    description: 'OpenMind AI — polski lider wdrożeń sztucznej inteligencji dla firm, agencji i szkół. Konsulting, szkolenia AI i automatyzacja. Bezpłatne konsultacje.',
    keywords: 'wdrożenia AI, szkolenia AI, konsulting AI, sztuczna inteligencja, automatyzacja procesów, ChatGPT, Claude, Gemini, Copilot, AI dla firm, AI dla szkół, OpenMind AI, Polska',
    path: '/',
    ogTitle: 'OpenMind AI Consulting — Wdrożenia AI dla firm i szkół w Polsce',
    ogDescription: 'Polski lider wdrożeń sztucznej inteligencji. Konsulting, szkolenia AI z ChatGPT, Claude, Copilot, Gemini. Bezpłatne pierwsze konsultacje.',
    jsonLd,
  });

  return (
    <div className="min-h-screen bg-background">
      <FloatingNav />
      <VideoHero />
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <MissionSection />
        <BentoGrid />
        <SeoContentSections />
        <ServiceAreas />
        <ParticleFooter />
        <Chatbot />
      </Suspense>
    </div>
  );
};

export default Home;
