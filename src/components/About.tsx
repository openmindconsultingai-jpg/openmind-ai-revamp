import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import OpenMindScrollHero, { HeroService } from '@/components/OpenMindScrollHero';
import { useLanguage } from '@/contexts/LanguageContext';

const justify: React.CSSProperties = { textAlign: 'justify', hyphens: 'auto' };

const HERO_BASE =
  'https://nyxcjvbeipocvgjforpn.supabase.co/storage/v1/object/public/hero/';
const HERO_DESKTOP = `${HERO_BASE}httpsopenmind-ai.higgsfield.appassetsworldscene-01.mp4.mp4`;
const HERO_MOBILE = `${HERO_BASE}httpsopenmind-ai.higgsfield.appassetsworldscene-01-mobile.mp4.mp4`;
const HERO_POSTER = `${HERO_BASE}httpsopenmind-ai.higgsfield.appassetsworldscene-01-poster.png.png`;
const HERO_MOBILE_POSTER = `${HERO_BASE}httpsopenmind-ai.higgsfield.appassetsworldscene-01-mobile-poster.png.png`;

const SERVICES_PL: HeroService[] = [
  {
    no: '01',
    title: 'Szkolenia',
    body: 'Stacjonarne w całej Polsce, online na żywo i 1:1. Zawsze budowane od podstaw pod branżę, narzędzia i poziom grupy, nigdy z gotowej prezentacji.',
    href: '/szkolenia-ai',
  },
  {
    no: '02',
    title: 'Audyty wdrożenia AI',
    body: 'Analiza procesów, danych i infrastruktury, zanim zaproponujemy jakiekolwiek rozwiązanie. Bez audytu nie projektujemy wdrożeń szytych na miarę.',
    href: '/konsultacje-ai',
  },
  {
    no: '03',
    title: 'Wdrożenia i integracje',
    body: 'Konfiguracja ChatGPT, Microsoft Copilot i Claude w firmie, własni asystenci pod stanowiska, automatyzacje łączące AI z Excelem, pocztą i CRM.',
    href: '/automatyzacja-ai',
  },
  {
    no: '04',
    title: 'Rozwiązania lokalne',
    body: 'Dla branż, w których dane nie mogą opuszczać firmy, wdrażamy modele językowe lokalnie, na własnej infrastrukturze klienta.',
    href: '/konsultacje-ai',
  },
  {
    no: '05',
    title: 'Zgodność z AI Act',
    body: 'Audyty i dokumentacja zgodności dla firm objętych unijnym rozporządzeniem o sztucznej inteligencji.',
    href: '/konsultacje-ai',
  },
  {
    no: '06',
    title: 'Doradztwo strategiczne',
    body: 'Pomagamy zarządom wybrać kierunek: gdzie AI realnie zwróci się w firmie, w jakiej kolejności wdrażać i jak mierzyć efekty.',
    href: '/konsultacje-ai',
  },
];

const SERVICES_EN: HeroService[] = [
  {
    no: '01',
    title: 'Training',
    body: 'On-site across Poland, live online and 1:1. Always built from scratch around your industry, tools and the level of the group, never from a ready-made deck.',
    href: '/szkolenia-ai',
  },
  {
    no: '02',
    title: 'AI adoption audits',
    body: 'An analysis of processes, data and infrastructure before we propose any solution. Without an audit we do not design tailor-made deployments.',
    href: '/konsultacje-ai',
  },
  {
    no: '03',
    title: 'Deployments and integrations',
    body: 'Setting up ChatGPT, Microsoft Copilot and Claude inside the company, custom assistants for specific roles, automations linking AI with Excel, email and CRM.',
    href: '/automatyzacja-ai',
  },
  {
    no: '04',
    title: 'On-premise solutions',
    body: 'For industries where data cannot leave the company, we deploy language models locally, on the client\u2019s own infrastructure.',
    href: '/konsultacje-ai',
  },
  {
    no: '05',
    title: 'AI Act compliance',
    body: 'Compliance audits and documentation for companies covered by the EU regulation on artificial intelligence.',
    href: '/konsultacje-ai',
  },
  {
    no: '06',
    title: 'Strategic advisory',
    body: 'We help boards choose a direction: where AI will actually pay off, in what order to deploy it and how to measure the results.',
    href: '/konsultacje-ai',
  },
];

const COPY = {
  pl: {
    h1: 'O nas',
    intro:
      'OpenMind AI Consulting to polska firma doradczo-wdrożeniowa, która pomaga firmom, instytucjom publicznym i szkołom faktycznie wykorzystywać sztuczną inteligencję w codziennej pracy, a nie tylko o niej rozmawiać.',
    kicker: 'OpenMind AI Consulting',
    heroTitle: 'Co robimy',
    heroSubtitle: 'Sześć obszarów, w których wdrażamy AI u naszych klientów.',
    forWhom: 'Dla kogo pracujemy',
    forWhom1:
      'Od startu przeprowadziliśmy dziesiątki projektów w praktycznie każdej branży, jaka funkcjonuje w polskiej gospodarce: w produkcji i przemyśle, budownictwie, rolnictwie i agrobiznesie, handlu detalicznym i hurtowym, imporcie i logistyce, nieruchomościach i budownictwie społecznym, bankowości, kancelariach prawnych, gabinetach lekarskich i psychoterapeutycznych, hotelarstwie i gastronomii, muzealnictwie i instytucjach kultury, fundacjach i NGO, a także w administracji publicznej i urzędach.',
    forWhom2:
      'Pracujemy zarówno z dużymi korporacjami, jak i z małymi, rodzinnymi firmami. Pięcioosobowy zespół i stuosobowa organizacja dostają program tak samo dopasowany do ich rzeczywistej pracy, nigdy ten sam uniwersalny szablon.',
    how: 'Jak pracujemy',
    how1:
      'Nie prowadzimy wykładów o AI. Prowadzimy warsztaty, audyty i wdrożenia, po których zespół wraca do pracy z czymś gotowym do użycia: przetestowanym promptem, działającym asystentem albo uruchomionym procesem, nigdy z listą ciekawostek.',
    how2:
      'Każdy projekt zaczyna się od tego samego pytania: jak dziś wygląda Wasza praca? Dopiero potem dobieramy narzędzie, nigdy odwrotnie. Jesteśmy niezależni od jednego dostawcy: ChatGPT, Microsoft Copilot, Claude albo lokalny model open source, w zależności od tego, co faktycznie rozwiąże problem.',
    who: 'Kto za tym stoi',
    who1:
      'Założycielem OpenMind AI Consulting jest Łukasz Czarnecki, który łączy doświadczenie wdrożeniowe i trenerskie w sektorze bankowym i dużych korporacjach z bliską współpracą z małymi, rodzinnymi firmami. Dzięki temu rozmawiamy zarówno językiem zarządu, jak i językiem zespołu, który ma z AI korzystać na co dzień.',
    reach: 'Zasięg',
    reach1:
      'Działamy stacjonarnie w każdym mieście w Polsce i online dla zespołów rozproszonych. Pierwsza konsultacja jest zawsze bezpłatna i niezobowiązująca.',
    cta: 'Napisz do nas przez formularz',
    more: 'Zobacz zakres',
    hint: 'Przewijaj, aby odtworzyć',
    services: SERVICES_PL,
  },
  en: {
    h1: 'About us',
    intro:
      'OpenMind AI Consulting is a Polish advisory and implementation company that helps businesses, public institutions and schools actually use artificial intelligence in their daily work, instead of only talking about it.',
    kicker: 'OpenMind AI Consulting',
    heroTitle: 'What we do',
    heroSubtitle: 'Six areas in which we deploy AI for our clients.',
    forWhom: 'Who we work for',
    forWhom1:
      'Since day one we have delivered dozens of projects in practically every sector of the Polish economy: manufacturing and industry, construction, agriculture and agribusiness, retail and wholesale, import and logistics, real estate and social housing, banking, law firms, medical and psychotherapy practices, hospitality and gastronomy, museums and cultural institutions, foundations and NGOs, as well as public administration and government offices.',
    forWhom2:
      'We work with large corporations and small family businesses alike. A five-person team and a hundred-person organisation each get a programme equally tailored to their real work, never the same universal template.',
    how: 'How we work',
    how1:
      'We do not give lectures about AI. We run workshops, audits and deployments after which the team goes back to work with something ready to use: a tested prompt, a working assistant or a process that is already running, never a list of curiosities.',
    how2:
      'Every project starts with the same question: what does your work look like today? Only then do we choose the tool, never the other way round. We are independent of any single vendor: ChatGPT, Microsoft Copilot, Claude or a local open-source model, depending on what will actually solve the problem.',
    who: 'Who is behind it',
    who1:
      'OpenMind AI Consulting was founded by Łukasz Czarnecki, who combines implementation and training experience in the banking sector and large corporations with close cooperation with small, family-run businesses. Thanks to that we speak both the language of the board and the language of the team that will use AI every day.',
    reach: 'Where we work',
    reach1:
      'We work on-site in every city in Poland and online for distributed teams. The first consultation is always free and comes with no obligation.',
    cta: 'Write to us via the form',
    more: 'See the scope',
    hint: 'Scroll to play',
    services: SERVICES_EN,
  },
} as const;

const About = () => {
  const { language } = useLanguage();
  const c = COPY[language === 'en' ? 'en' : 'pl'];

  return (
    <>
      <section className="relative pt-28 md:pt-36 pb-10 md:pb-14 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[60vh] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, hsl(176 100% 43% / 0.10) 0%, transparent 65%)',
          }}
        />
        <div className="container mx-auto px-6 relative">
          <div className="max-w-3xl mx-auto">
            <header>
              <h1 className="font-heading text-4xl md:text-6xl font-bold tracking-[-0.04em] leading-[1.02] mb-6">
                <span className="text-gradient">{c.h1}</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed" style={justify}>
                {c.intro}
              </p>
            </header>
          </div>
        </div>
      </section>

      {/* Kula wideo sterowana przewijaniem — kategorie „Co robimy” */}
      <OpenMindScrollHero
        desktopSrc={HERO_DESKTOP}
        mobileSrc={HERO_MOBILE}
        poster={HERO_POSTER}
        mobilePoster={HERO_MOBILE_POSTER}
        kicker={c.kicker}
        title={c.heroTitle}
        subtitle={c.heroSubtitle}
        services={c.services}
        scrollVh={6}
        headlineHold={0.14}
        headingLevel={2}
      />

      <section className="relative pt-20 md:pt-28 pb-20 md:pb-28">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto space-y-14 md:space-y-20">

            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-5">
                <span className="text-gradient">{c.forWhom}</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4" style={justify}>
                {c.forWhom1}
              </p>
              <p className="text-muted-foreground leading-relaxed" style={justify}>
                {c.forWhom2}
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-5">
                <span className="text-gradient">{c.how}</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4" style={justify}>
                {c.how1}
              </p>
              <p className="text-muted-foreground leading-relaxed" style={justify}>
                {c.how2}
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-5">
                <span className="text-gradient">{c.who}</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed" style={justify}>
                {c.who1}
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-5">
                <span className="text-gradient">{c.reach}</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed" style={justify}>
                {c.reach1}
              </p>
            </div>

            <div className="pt-2">
              <Link to="/contact">
                <Button size="lg" className="font-semibold">
                  {c.cta}
                  <ArrowRight size={18} />
                </Button>
              </Link>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default About;
