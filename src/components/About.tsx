import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import OpenMindScrollHero, { HeroService } from '@/components/OpenMindScrollHero';

const justify: React.CSSProperties = { textAlign: 'justify', hyphens: 'auto' };

const HERO_BASE =
  'https://nyxcjvbeipocvgjforpn.supabase.co/storage/v1/object/public/hero/';
const HERO_DESKTOP = `${HERO_BASE}httpsopenmind-ai.higgsfield.appassetsworldscene-01.mp4.mp4`;
const HERO_MOBILE = `${HERO_BASE}httpsopenmind-ai.higgsfield.appassetsworldscene-01-mobile.mp4.mp4`;
const HERO_POSTER = `${HERO_BASE}httpsopenmind-ai.higgsfield.appassetsworldscene-01-poster.png.png`;
const HERO_MOBILE_POSTER = `${HERO_BASE}httpsopenmind-ai.higgsfield.appassetsworldscene-01-mobile-poster.png.png`;

const WHAT_WE_DO: HeroService[] = [
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
    title: 'Treści generatywne',
    body: 'Obrazy i wideo (Midjourney, Runway, Sora) na potrzeby marketingu i sprzedaży.',
    href: '/teledyski-ai',
  },
];

const About = () => {
  return (
    <>
      <section className="relative pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[60vh] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, hsl(176 100% 43% / 0.10) 0%, transparent 65%)',
          }}
        />
        <div className="container mx-auto px-6 relative">
          <div className="max-w-3xl mx-auto space-y-14 md:space-y-20">

            <header>
              <h1 className="font-heading text-4xl md:text-6xl font-bold tracking-[-0.04em] leading-[1.02] mb-6">
                O <span className="text-gradient">nas</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed" style={justify}>
                OpenMind AI Consulting to polska firma doradczo-wdrożeniowa, która pomaga firmom,
                instytucjom publicznym i szkołom faktycznie wykorzystywać sztuczną inteligencję
                w codziennej pracy, a nie tylko o niej rozmawiać.
              </p>
            </header>

            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-5">Dla kogo pracujemy</h2>
              <p className="text-muted-foreground leading-relaxed mb-4" style={justify}>
                Od startu przeprowadziliśmy dziesiątki projektów w praktycznie każdej branży, jaka
                funkcjonuje w polskiej gospodarce: w produkcji i przemyśle, budownictwie, rolnictwie
                i agrobiznesie, handlu detalicznym i hurtowym, imporcie i logistyce, nieruchomościach
                i budownictwie społecznym, bankowości, kancelariach prawnych, gabinetach lekarskich
                i psychoterapeutycznych, hotelarstwie i gastronomii, muzealnictwie i instytucjach
                kultury, fundacjach i NGO, a także w administracji publicznej i urzędach.
              </p>
              <p className="text-muted-foreground leading-relaxed" style={justify}>
                Pracujemy zarówno z dużymi korporacjami, jak i z małymi, rodzinnymi firmami.
                Pięcioosobowy zespół i stuosobowa organizacja dostają program tak samo dopasowany
                do ich rzeczywistej pracy, nigdy ten sam uniwersalny szablon.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Kula wideo sterowana przewijaniem — kategorie „Co robimy” */}
      <OpenMindScrollHero
        desktopSrc={HERO_DESKTOP}
        mobileSrc={HERO_MOBILE}
        poster={HERO_POSTER}
        mobilePoster={HERO_MOBILE_POSTER}
        kicker="OpenMind AI Consulting"
        title="Co robimy"
        subtitle="Sześć obszarów, w których wdrażamy AI u naszych klientów."
        services={WHAT_WE_DO}
        scrollVh={9}
        headlineHold={0.16}
      />

      <section className="relative pt-20 md:pt-28 pb-20 md:pb-28">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto space-y-14 md:space-y-20">

            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-5">Jak pracujemy</h2>
              <p className="text-muted-foreground leading-relaxed mb-4" style={justify}>
                Nie prowadzimy wykładów o AI. Prowadzimy warsztaty, audyty i wdrożenia, po których
                zespół wraca do pracy z czymś gotowym do użycia: przetestowanym promptem, działającym
                asystentem albo uruchomionym procesem, nigdy z listą ciekawostek.
              </p>
              <p className="text-muted-foreground leading-relaxed" style={justify}>
                Każdy projekt zaczyna się od tego samego pytania: jak dziś wygląda Wasza praca?
                Dopiero potem dobieramy narzędzie, nigdy odwrotnie. Jesteśmy niezależni od jednego
                dostawcy: ChatGPT, Microsoft Copilot, Claude albo lokalny model open source,
                w zależności od tego, co faktycznie rozwiąże problem.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-5">Kto za tym stoi</h2>
              <p className="text-muted-foreground leading-relaxed" style={justify}>
                Założycielem OpenMind AI Consulting jest Łukasz Czarnecki, który łączy doświadczenie
                wdrożeniowe i trenerskie w sektorze bankowym i dużych korporacjach z bliską współpracą
                z małymi, rodzinnymi firmami. Dzięki temu rozmawiamy zarówno językiem zarządu, jak
                i językiem zespołu, który ma z AI korzystać na co dzień.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-5">Zasięg</h2>
              <p className="text-muted-foreground leading-relaxed" style={justify}>
                Działamy stacjonarnie w każdym mieście w Polsce i online dla zespołów rozproszonych.
                Pierwsza konsultacja jest zawsze bezpłatna i niezobowiązująca.
              </p>
            </div>

            <div className="pt-2">
              <Link to="/contact">
                <Button size="lg" className="font-semibold">
                  Napisz do nas przez formularz
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
