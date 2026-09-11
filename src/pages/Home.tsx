import { lazy, Suspense, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FloatingNav from '@/components/FloatingNav';
import { LovableTower } from '@/components/openmind-tower';
import { towerConfig } from '@/config/tower-config';
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

type TowerSection = {
  id: string;
  no: string;
  title: string;
  body: string;
  href: string;
};

const SECTIONS: TowerSection[] = [
  {
    id: 'tower-szkolenia',
    no: '01',
    title: 'Szkolenia z AI',
    body: 'Warsztaty z najlepszych narzędzi AI i automatyzacji — stacjonarnie, online i 1:1.',
    href: '/szkolenia-ai',
  },
  {
    id: 'tower-konsultacje',
    no: '02',
    title: 'Konsultacje i strategia AI w firmie',
    body: 'Audyt procesów, dobór narzędzi i plan wdrożenia. Pierwsza rozmowa bezpłatna.',
    href: '/konsultacje-ai',
  },
  {
    id: 'tower-strony',
    no: '03',
    title: 'Czatboty, strony WWW, branding',
    body: 'Strony pod wyszukiwarki, czatbot na stronie i pełna identyfikacja wizualna.',
    href: '/strony-www-branding',
  },
  {
    id: 'tower-teledyski',
    no: '04',
    title: 'Produkcja treści marketingowych i wideo AI',
    body: 'Teledyski, spoty reklamowe, animacje i materiały do social mediów.',
    href: '/teledyski-ai',
  },
  {
    id: 'tower-firma',
    no: '05',
    title: 'Rozwój każdej firmy z AI',
    body: 'Dla startupów, jednoosobowych działalności i małych firm — od pomysłu po skalowanie.',
    href: '/zakladanie-firmy-z-ai',
  },
  {
    id: 'tower-automatyzacje',
    no: '06',
    title: 'Automatyzacje, aplikacje dedykowane i agenci AI',
    body: 'Agenci AI, aplikacje dedykowane, obieg dokumentów i integracje z CRM oraz ERP.',
    href: '/automatyzacja-ai',
  },
];

const Home = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
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
    <div className="min-h-screen" style={{ background: '#080e13' }}>
      <FloatingNav />
      <LovableTower
        {...towerConfig}
        onCategory={(category) => {
          const match = SECTIONS.find((section) => `#${section.id}` === category.section);
          if (match) {
            navigate(match.href);
            return false;
          }
        }}
      />

      <main className="relative z-[1]">
        {/* Intro / H1 */}
        <section className="min-h-[68vh] md:min-h-[90vh] flex items-end md:items-center pb-16 md:pb-0 pt-24 md:pt-0 bg-transparent">
          <div className="max-w-[1180px] w-full mx-auto px-6 md:px-14">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold leading-[1.02] tracking-[-0.04em] text-foreground mb-6">
                AI, które naprawdę działa u Ciebie w firmie, urzędzie, szkole czy w domu
              </h1>
              <p className="text-base md:text-lg text-muted-foreground mb-8">
                Szkolenia, audyty i wdrożenia sztucznej inteligencji — od pierwszej rozmowy
                po działający proces. Przewijaj, aby zobaczyć zakres współpracy.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-primary border-b border-primary/40 pb-1"
              >
                Napisz do nas przez formularz <span aria-hidden="true">&#8594;</span>
              </Link>
            </div>
          </div>
        </section>

        {SECTIONS.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="min-h-screen flex items-center bg-transparent"
          >
            <div className="max-w-[1180px] w-full mx-auto px-6 md:px-14">
              <div className="max-w-xl">
                <p className="font-mono text-[11px] tracking-[0.3em] text-primary mb-4">{section.no}</p>
                <h2 className="text-4xl md:text-6xl font-bold leading-[0.98] tracking-[-0.04em] text-foreground mb-5">
                  {section.title}
                </h2>
                <p className="text-base md:text-lg text-muted-foreground mb-7">{section.body}</p>
                <Link
                  to={section.href}
                  className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-primary border-b border-primary/40 pb-1"
                >
                  Zobacz zakres <span aria-hidden="true">&#8594;</span>
                </Link>
              </div>
            </div>
          </section>
        ))}

        {/* Content below the tower sequence — opaque so it covers the fixed stage */}
        <div className="relative z-[2] bg-background">
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
