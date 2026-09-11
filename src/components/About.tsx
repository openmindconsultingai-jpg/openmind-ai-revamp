import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LazyNeuralIframe from '@/components/LazyNeuralIframe';

const justify: React.CSSProperties = { textAlign: 'justify', hyphens: 'auto' };

const WHAT_WE_DO = [
  {
    title: 'Szkolenia',
    body: 'Stacjonarne w całej Polsce, online na żywo i 1:1. Zawsze budowane od podstaw pod branżę, narzędzia i poziom grupy, nigdy z gotowej prezentacji.',
  },
  {
    title: 'Audyty wdrożenia AI',
    body: 'Analiza procesów, danych i infrastruktury, zanim zaproponujemy jakiekolwiek rozwiązanie. Bez audytu nie projektujemy wdrożeń szytych na miarę.',
  },
  {
    title: 'Wdrożenia i integracje',
    body: 'Konfiguracja ChatGPT, Microsoft Copilot i Claude w środowisku firmowym, budowa własnych asystentów pod konkretne stanowiska, automatyzacje (Make, n8n) łączące AI z Excelem, pocztą i systemami CRM.',
  },
  {
    title: 'Rozwiązania lokalne',
    body: 'Dla branż, w których dane nie mogą opuszczać firmy, na przykład kancelarii czy placówek medycznych, wdrażamy modele językowe lokalnie, na własnej infrastrukturze klienta.',
  },
  {
    title: 'Zgodność z AI Act',
    body: 'Audyty i dokumentacja zgodności dla firm objętych unijnym rozporządzeniem o sztucznej inteligencji.',
  },
  {
    title: 'Treści generatywne',
    body: 'Obrazy i wideo (Midjourney, Runway, Sora) na potrzeby marketingu i sprzedaży.',
  },
];

const About = () => {
  return (
    <section className="pt-28 md:pt-36 pb-20 md:pb-28">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">

          <header className="mb-14 md:mb-20">
            <h1 className="font-heading text-4xl md:text-6xl font-bold tracking-[-0.04em] leading-[1.02] mb-6">
              O nas
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed" style={justify}>
              OpenMind AI Consulting to polska firma doradczo-wdrożeniowa, która pomaga firmom,
              instytucjom publicznym i szkołom faktycznie wykorzystywać sztuczną inteligencję
              w codziennej pracy, a nie tylko o niej rozmawiać.
            </p>
          </header>

          <div className="space-y-14 md:space-y-20">

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

            <div className="relative lg:-mx-[12vw]">
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8 lg:px-[12vw]">
                Co <span className="text-gradient">robimy</span>
              </h2>

              <div className="grid gap-8 lg:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start lg:px-6">
                <div className="relative lg:sticky lg:top-28">
                  <div
                    className="relative w-full h-[320px] sm:h-[420px] lg:h-[560px] rounded-3xl overflow-hidden"
                    style={{
                      background:
                        'radial-gradient(ellipse at center, hsl(176 100% 43% / 0.10) 0%, transparent 70%)',
                    }}
                  >
                    <LazyNeuralIframe
                      src="/openmind-neural-recreated.html?v=8"
                      title="OpenMind AI – interaktywny model sieci neuronowej"
                      loadStrategy="viewport"
                    />
                  </div>
                </div>

                <div className="grid gap-4">
                  {WHAT_WE_DO.map((item) => (
                    <div
                      key={item.title}
                      className="group rounded-xl border border-primary/15 bg-card/40 p-5 backdrop-blur-sm transition-colors duration-300 hover:border-primary/40 hover:bg-card/60"
                    >
                      <h3 className="font-heading text-base md:text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed" style={justify}>
                        {item.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

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
      </div>
    </section>
  );
};

export default About;
