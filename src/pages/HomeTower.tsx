import { useNavigate } from 'react-router-dom';
import FloatingNav from '@/components/FloatingNav';
import { LovableTower } from '@/components/openmind-tower';
import { towerConfig } from '@/config/tower-config';
import usePageMeta from '@/hooks/usePageMeta';

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

const HomeTower = () => {
  const navigate = useNavigate();

  usePageMeta({
    title: 'Wariant HERO — OpenMind Tower | OpenMind AI Consulting',
    description: 'Podgląd alternatywnego wariantu sekcji powitalnej z animacją wieży sterowaną przewijaniem.',
    path: '/wariant-tower',
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
                <a
                  href={section.href}
                  className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-primary border-b border-primary/40 pb-1"
                >
                  Zobacz zakres <span aria-hidden="true">&#8594;</span>
                </a>
              </div>
            </div>
          </section>
        ))}
        <div className="h-screen" aria-hidden="true" />
      </main>
    </div>
  );
};

export default HomeTower;
