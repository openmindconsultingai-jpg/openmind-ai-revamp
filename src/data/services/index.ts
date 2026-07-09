// Service content registry — 9 SEO landing pages + hub.
// Content is 1:1 with the prototype .htm files stored as adjacent .json.
// Rendered by src/pages/ServiceLandingPage.tsx and src/pages/ServicesHubPage.tsx.

import automatyzacja from './automatyzacja-ai.json';
import szkolenia from './szkolenia-ai.json';
import szkoleniaStacj from './szkolenia-ai-stacjonarne.json';
import szkoleniaOnline from './szkolenia-ai-online.json';
import szkoleniaIndyw from './szkolenia-ai-indywidualne.json';
import aiDlaSzkol from './ai-dla-szkol.json';
import teledyski from './teledyski-ai.json';
import strony from './strony-www-branding.json';
import konsultacje from './konsultacje-ai.json';
import hub from './services-hub.json';
import { INDUSTRY_TRAINING_ENTRIES } from './industry-trainings';

export interface ProtoSub {
  h3: string;
  p: string[];
  li: string[];
}
export interface ProtoSection {
  h2: string;
  p: string[];
  li: string[];
  subs: ProtoSub[];
}
export interface Proto {
  title: string;
  description: string;
  h1: string;
  sections: ProtoSection[];
  jsonld: Record<string, unknown>[];
}

export interface ServiceEntry {
  slug: string;
  /** URL path without .html suffix */
  path: string;
  /** Short title used in navigation, cards, breadcrumbs */
  navLabel: string;
  /** One-liner rendered on the hub card */
  shortDesc: string;
  /** Include the 192-city ServiceAreas section */
  showCities: boolean;
  /** Anchor prefix used inside ServiceAreas listing (only when showCities) */
  citiesAnchorPrefix?: string;
  /** Full prototype content */
  data: Proto;
}

export const HUB: Proto = hub as unknown as Proto;

export const services: Record<string, ServiceEntry> = {
  'automatyzacja-ai': {
    slug: 'automatyzacja-ai',
    path: '/automatyzacja-ai',
    navLabel: 'Automatyzacje i agenci AI',
    shortDesc:
      'Systemy, agenci AI i automatyzacje procesów: obsługa klienta, dokumenty, raporty, integracje z CRM i ERP.',
    showCities: false,
    data: automatyzacja as unknown as Proto,
  },
  'szkolenia-ai': {
    slug: 'szkolenia-ai',
    path: '/szkolenia-ai',
    navLabel: 'Szkolenia AI',
    shortDesc:
      'Praktyczne warsztaty z ChatGPT, Claude i automatyzacji — stacjonarnie, online i indywidualnie 1:1.',
    showCities: true,
    citiesAnchorPrefix: 'Szkolenia AI',
    data: szkolenia as unknown as Proto,
  },
  'szkolenia-ai-stacjonarne': {
    slug: 'szkolenia-ai-stacjonarne',
    path: '/szkolenia-ai-stacjonarne',
    navLabel: 'Szkolenia AI stacjonarne',
    shortDesc:
      'Zamknięte warsztaty AI w siedzibie Twojej firmy — każde miasto w Polsce, program pod branżę.',
    showCities: true,
    citiesAnchorPrefix: 'Szkolenie AI stacjonarne',
    data: szkoleniaStacj as unknown as Proto,
  },
  'szkolenia-ai-online': {
    slug: 'szkolenia-ai-online',
    path: '/szkolenia-ai-online',
    navLabel: 'Szkolenia AI online',
    shortDesc:
      'Warsztaty na żywo z trenerem przez Teams / Zoom / Meet. Certyfikaty i nagrania, szybkie terminy.',
    showCities: false,
    data: szkoleniaOnline as unknown as Proto,
  },
  'szkolenia-ai-indywidualne': {
    slug: 'szkolenia-ai-indywidualne',
    path: '/szkolenia-ai-indywidualne',
    navLabel: 'Szkolenia AI 1:1',
    shortDesc:
      'Indywidualne szkolenia i mentoring AI — program pod Twoje stanowisko, praca na Twoich dokumentach.',
    showCities: false,
    data: szkoleniaIndyw as unknown as Proto,
  },
  'ai-dla-szkol': {
    slug: 'ai-dla-szkol',
    path: '/ai-dla-szkol',
    navLabel: 'AI dla szkół',
    shortDesc:
      'Kursy i pokazy AI w szkołach — dla uczniów, nauczycieli i dyrekcji. Cała Polska, stacjonarnie i online.',
    showCities: true,
    citiesAnchorPrefix: 'AI dla szkół',
    data: aiDlaSzkol as unknown as Proto,
  },
  'teledyski-ai': {
    slug: 'teledyski-ai',
    path: '/teledyski-ai',
    navLabel: 'Teledyski i wideo AI',
    shortDesc:
      'Pełne teledyski, spoty reklamowe, animacje i filmiki social media — kinowa jakość bez kinowego budżetu.',
    showCities: false,
    data: teledyski as unknown as Proto,
  },
  'strony-www-branding': {
    slug: 'strony-www-branding',
    path: '/strony-www-branding',
    navLabel: 'Strony WWW i branding',
    shortDesc:
      'Strony zoptymalizowane pod SEO z modułami AI (chatbot, wyszukiwanie semantyczne) i identyfikacje wizualne.',
    showCities: false,
    data: strony as unknown as Proto,
  },
  'konsultacje-ai': {
    slug: 'konsultacje-ai',
    path: '/konsultacje-ai',
    navLabel: 'Konsultacje AI',
    shortDesc:
      'Konsultacje indywidualne w naszej siedzibie, u Ciebie lub online. Audyt, dobór narzędzi, strategia.',
    showCities: false,
    data: konsultacje as unknown as Proto,
  },
};

export const servicesList: ServiceEntry[] = Object.values(services);

/** Extract FAQ Q/A pairs from the JSON-LD FAQPage node (if present). */
export function extractFaq(proto: Proto): { q: string; a: string }[] {
  const faqNode = proto.jsonld.find((n) => n['@type'] === 'FAQPage') as
    | { mainEntity?: Array<{ name: string; acceptedAnswer?: { text?: string } }> }
    | undefined;
  if (!faqNode?.mainEntity) return [];
  return faqNode.mainEntity.map((q) => ({
    q: q.name,
    a: q.acceptedAnswer?.text ?? '',
  }));
}

/** Sections excluding FAQ ("Pytania...") and the trailing "Porozmawiajmy..." CTA. */
export function bodySections(proto: Proto): ProtoSection[] {
  return proto.sections.filter(
    (s) =>
      !/^Pytania/i.test(s.h2) &&
      !/^Porozmawiajmy/i.test(s.h2) &&
      !/^Najczęstsze pytania/i.test(s.h2),
  );
}
