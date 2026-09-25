import { lazy, Suspense, useMemo } from 'react';
import FloatingNav from '@/components/FloatingNav';
import ScrollVideoHero from '@/components/ScrollVideoHero';
import { useLanguage } from '@/contexts/LanguageContext';

import useSmoothScroll from '@/hooks/useSmoothScroll';
import useCanonical from '@/hooks/useCanonical';
import usePageMeta from '@/hooks/usePageMeta';

// Lazy load below-the-fold sections for better FCP/LCP
const LogoTicker = lazy(() => import('@/components/LogoTicker'));
const ServiceAreas = lazy(() => import('@/components/ServiceAreas'));
const ParticleFooter = lazy(() => import('@/components/ParticleFooter'));
const SeoContentSections = lazy(() => import('@/components/SeoContentSections'));
const Chatbot = lazy(() => import('@/components/Chatbot'));

const Home = () => {
  const { language } = useLanguage();
  useSmoothScroll();
  useCanonical();

  const jsonLd = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'OpenMind AI Consulting',
    description: language === 'pl'
      ? 'Polski lider wdrożeń sztucznej inteligencji dla firm, agencji marketingowych i szkół. Konsulting AI, szkolenia z ChatGPT, Claude, Copilot i Gemini, automatyzacja procesów biznesowych.'
      : 'Polish leader in AI implementation for businesses, marketing agencies and schools. AI consulting, training with ChatGPT, Claude, Copilot and Gemini, business process automation.',
    url: 'https://openmindai.pl',
    areaServed: { '@type': 'Country', name: language === 'pl' ? 'Polska' : 'Poland' },
    serviceType: language === 'pl'
      ? ['Wdrożenia AI', 'Szkolenia AI', 'Konsulting sztuczna inteligencja', 'Automatyzacja procesów', 'AI dla szkół']
      : ['AI Implementation', 'AI Training', 'AI Consulting', 'Process Automation', 'AI for Schools'],
    priceRange: '$$',
    knowsAbout: [
      'ChatGPT', 'Claude', 'Gemini', 'Microsoft Copilot',
      'Midjourney', 'ElevenLabs', 'Runway', 'Azure OpenAI',
    ],
  }), [language]);

  usePageMeta({
    title: language === 'pl'
      ? 'OpenMind AI Consulting — Wdrożenia AI, szkolenia i konsulting dla firm i szkół w Polsce'
      : 'OpenMind AI Consulting — AI Implementation, Training & Consulting for Businesses and Schools in Poland',
    description: language === 'pl'
      ? 'OpenMind AI — polski lider wdrożeń sztucznej inteligencji dla firm, agencji i szkół. Konsulting, szkolenia AI i automatyzacja. Bezpłatne konsultacje.'
      : 'OpenMind AI — Polish leader in AI implementation for businesses, agencies and schools. Consulting, AI training and automation. Free consultations.',
    keywords: language === 'pl'
      ? 'wdrożenia AI, szkolenia AI, konsulting AI, sztuczna inteligencja, automatyzacja procesów, ChatGPT, Claude, Gemini, Copilot, AI dla firm, AI dla szkół, OpenMind AI, Polska'
      : 'AI implementation, AI training, AI consulting, artificial intelligence, process automation, ChatGPT, Claude, Gemini, Copilot, AI for business, AI for schools, OpenMind AI, Poland',
    path: '/',
    ogTitle: language === 'pl'
      ? 'OpenMind AI Consulting — Wdrożenia AI dla firm i szkół w Polsce'
      : 'OpenMind AI Consulting — AI Implementation for Businesses and Schools in Poland',
    ogDescription: language === 'pl'
      ? 'Polski lider wdrożeń sztucznej inteligencji. Konsulting, szkolenia AI z ChatGPT, Claude, Copilot, Gemini. Bezpłatne pierwsze konsultacje.'
      : 'Polish leader in AI implementation. Consulting, AI training with ChatGPT, Claude, Copilot, Gemini. First consultations free.',
    jsonLd,
  });

  return (
    <div className="min-h-screen bg-background">
      <FloatingNav />
      <ScrollVideoHero />

      <main className="relative z-[1]">
        <div className="bg-background">
          <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <div className="pt-12 md:pt-16">
              <LogoTicker />
            </div>
            <ServiceAreas />
            <SeoContentSections />
            <ParticleFooter />
            <Chatbot />
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default Home;
