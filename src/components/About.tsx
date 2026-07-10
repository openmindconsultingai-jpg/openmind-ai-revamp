import { useEffect, useRef, lazy, Suspense } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Sparkles, Cpu, GraduationCap, Globe, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const LazyNeuralIframe = lazy(() => import('@/components/LazyNeuralIframe'));

gsap.registerPlugin(ScrollTrigger);

const DNA_CARDS = [
  {
    icon: Sparkles,
    title: 'KREATYWNOŚĆ BEZ GRANIC',
    description: '„Algorytmy też mają duszę." Tworzymy wideo i kampanie typu Scroll-Stoppers. Wykorzystujemy Sora i Runway do produkcji teledysków i wirtualnych influencerów, generując miliony organicznych wyświetleń.',
    accent: 'from-rose-500/20 to-fuchsia-500/20',
    borderAccent: 'group-hover:border-rose-500/40',
    iconBg: 'bg-rose-500/10 text-rose-400',
  },
  {
    icon: Cpu,
    title: 'EFEKTYWNOŚĆ I AUTOMATYZACJA',
    description: '„Zostaw robotę robotom." Wdrażamy systemy (Make/n8n) i dedykowane aplikacje LLM, które obsługują klientów 24/7, odzyskując czas Twojego zespołu na strategię.',
    accent: 'from-primary/20 to-cyan-500/20',
    borderAccent: 'group-hover:border-primary/40',
    iconBg: 'bg-primary/10 text-primary',
  },
  {
    icon: GraduationCap,
    title: 'EDUKACJA POKOLEŃ',
    description: '„Od Juniora do CEO." Uczymy biznes współpracy z AI, a w Akademii Młodego Twórcy pokazujemy dzieciom, jak bezpiecznie tworzyć przyszłość, zamiast ją tylko konsumować.',
    accent: 'from-violet-500/20 to-indigo-500/20',
    borderAccent: 'group-hover:border-violet-500/40',
    iconBg: 'bg-violet-500/10 text-violet-400',
  },
  {
    icon: Globe,
    title: 'CYFROWA TOŻSAMOŚĆ',
    description: '„Strona, która myśli." Projektujemy inteligentne strony WWW zintegrowane z chatbotami i asystentami głosowymi, tworząc branding wyprzedzający konkurencję.',
    accent: 'from-emerald-500/20 to-teal-500/20',
    borderAccent: 'group-hover:border-emerald-500/40',
    iconBg: 'bg-emerald-500/10 text-emerald-400',
  },
];

const TRUST_POINTS = [
  { text: 'Pionierzy Wdrożeń – Testujemy modele w dniu premiery.' },
  { text: 'Holistyczne Podejście – Strategia + Tech + Kreacja.' },
  { text: 'Bezpieczeństwo – AI Safety First & Ethics.' },
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text — render natychmiast (NO hidden state) by nie blokować FCP

      // Mission — szybciej
      gsap.fromTo('.about-mission', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.5, ease: 'power2.out',
        scrollTrigger: { trigger: '.about-mission', start: 'top 85%' },
      });

      // DNA cards — krótszy stagger, bez scale
      gsap.fromTo('.dna-card', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out',
        scrollTrigger: { trigger: '.dna-grid', start: 'top 85%' },
      });

      // Trust
      gsap.fromTo('.trust-item', { opacity: 0, x: -20 }, {
        opacity: 1, x: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out',
        scrollTrigger: { trigger: '.trust-section', start: 'top 85%' },
      });

      gsap.fromTo('.trust-cta', { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.5, ease: 'power2.out',
        scrollTrigger: { trigger: '.trust-cta', start: 'top 85%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);



  return (
    <section ref={sectionRef} className="pt-20 md:pt-24 pb-20 md:pb-32 relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-violet-500/5 blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto">

          {/* ═══ BLOCK 1: HERO HEADER ═══ */}
          <div className="text-center mb-24 md:mb-32 pt-8 md:pt-16">
            <h1 className="about-hero-h1 font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="text-gradient text-glow">
                Nie tylko przewidujemy przyszłość.
              </span>
              <br />
              <span className="text-foreground">
                My ją wdrażamy.
              </span>
            </h1>
            <p className="about-hero-sub text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              OpenMindAI: Twoja przewaga technologiczna w świecie, który zmienia się szybciej niż kiedykolwiek.
            </p>
          </div>

          {/* ═══ BLOCK 2: MISSION STATEMENT ═══ */}
          <div className="about-mission mb-24 md:mb-32">
            <div className="relative rounded-2xl border border-border/50 bg-card/30 backdrop-blur-md p-8 md:p-14 overflow-hidden">
              {/* Glow accent */}
              <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-primary/10 blur-[100px] pointer-events-none" />

              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                <span className="text-gradient">Witaj w erze „AI-First".</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-4xl" style={{ textAlign: 'justify', hyphens: 'auto' }}>
                W OpenMindAI wierzymy, że sztuczna inteligencja to nie tylko narzędzie – to nowy system operacyjny dla biznesu, kreatywności i edukacji. Nasza misja jest prosta: przekształcić technologiczny chaos w Twoją konkretną przewagę rynkową. Nie jesteśmy teoretykami. Jesteśmy praktykami, którzy budują milionowe zasięgi i automatyzują całe działy firm.
              </p>
            </div>

            {/* 3D Neural Model — mirrors Hero showcase */}
            <div
              className="relative mx-auto mt-10 md:mt-14 w-full"
              style={{ maxWidth: '880px', height: 'min(70svh, 620px)' }}
            >
              <Suspense fallback={null}>
                <LazyNeuralIframe className="absolute inset-0 w-full h-full" src="/openmind-neural-recreated.html?v=8" loadStrategy="viewport" />
              </Suspense>
            </div>
          </div>

          {/* ═══ BLOCK 3: OUR DNA – 2×2 BENTO ═══ */}
          <div className="mb-24 md:mb-32">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
              <span className="text-gradient">Nasze DNA</span>
            </h2>
            <div className="dna-grid grid grid-cols-1 md:grid-cols-2 gap-6">
              {DNA_CARDS.map((card) => (
                <div key={card.title} className={`dna-card group relative rounded-2xl border border-border/40 ${card.borderAccent} bg-card/30 backdrop-blur-sm p-8 transition-all duration-500 hover:bg-card/50 overflow-hidden`}>
                  {/* Hover gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />

                  <div className="relative z-10">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${card.iconBg} transition-transform duration-300 group-hover:scale-110`}>
                      <card.icon size={24} />
                    </div>
                    <h2 className="font-heading text-lg md:text-xl font-bold text-foreground mb-3 tracking-wide">
                      {card.title}
                    </h2>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed" style={{ textAlign: 'justify', hyphens: 'auto' }}>
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ═══ BLOCK 4: TRUST & CTA ═══ */}
          <div className="trust-section">
            {/* Trust points */}
            <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-10 mb-16">
              {TRUST_POINTS.map((point) => (
                <div key={point.text} className="trust-item flex items-start gap-3">
                  <CheckCircle size={22} className="text-primary mt-0.5 shrink-0" />
                  <p className="text-foreground/90 text-sm md:text-base">{point.text}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="trust-cta text-center">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8">
                <span className="text-gradient text-glow-subtle">Gotowy na przyspieszenie?</span>
              </h2>
              <Link to="/contact.html">
                <Button variant="glass" size="lg" className="text-base px-10 py-6 font-semibold tracking-wide">
                  ROZPOCZNIJ WSPÓŁPRACĘ
                  <ArrowRight size={20} />
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
