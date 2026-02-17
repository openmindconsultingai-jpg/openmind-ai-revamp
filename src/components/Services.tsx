import { memo, useState, useRef, useEffect } from 'react';
import { Video, Bot, GraduationCap, Globe, ChevronRight, ArrowRight } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import serviceVideoCreative from '@/assets/service-video-creative.mp4';
import serviceVideoAutomation from '@/assets/service-video-automation.mp4';
import serviceVideoEducation from '@/assets/service-video-education.mp4';
import serviceVideoWeb from '@/assets/service-video-web.mp4';

import imgCreative from '@/assets/service-media.jpg';
import imgAutomation from '@/assets/service-development.jpg';
import imgEducation from '@/assets/service-academy.jpg';
import imgWeb from '@/assets/service-consulting.jpg';

gsap.registerPlugin(ScrollTrigger);

interface ServiceData {
  id: string;
  icon: React.ReactNode;
  label: string;
  h2: string;
  description: string;
  video: string;
  image: string;
  accentClass: string;
  items?: string[];
  subTabs?: {
    label: string;
    accent?: boolean;
    items: { title: string; junior?: boolean }[];
  }[];
}

const services: ServiceData[] = [
  {
    id: 'creative',
    icon: <Video className="w-5 h-5" />,
    label: 'Agencja Kreatywna',
    h2: 'Agencja Kreatywna AI: Wideo Marketing, Teledyski i Virale',
    description: 'Tworzymy historie, które algorytmy kochają. Nasze produkcje wideo generowane przez AI zdobywają miliony wyświetleń i angażują odbiorców jak żadne inne medium.',
    video: serviceVideoCreative,
    image: imgCreative,
    accentClass: 'text-rose-400 border-rose-500/40 bg-rose-500/10',
    items: [
      'Produkcja Wideo i Teledysków AI (Sora/Runway)',
      'Wiralowe Rolki i TikToki (Short Form Video)',
      'Wirtualni Influencerzy i Cyfrowi Ambasadorzy',
      'Kampanie Reklamowe z AI Awatarami',
      'Generatywna Grafika i Kreacje Wizualne',
    ],
  },
  {
    id: 'automation',
    icon: <Bot className="w-5 h-5" />,
    label: 'Automatyzacja',
    h2: 'Automatyzacja Procesów Biznesowych i Wdrażanie Aplikacji AI',
    description: 'Zamieniamy ludzką pracę na inteligentne systemy. Automatyzujemy powtarzalne zadania, integrujemy narzędzia AI i budujemy dedykowane aplikacje, które skalują Twój biznes.',
    video: serviceVideoAutomation,
    image: imgAutomation,
    accentClass: 'text-violet-400 border-violet-500/40 bg-violet-500/10',
    items: [
      'Budowa Dedykowanych Aplikacji AI dla Firm',
      'Automatyzacja Workflow i Integracja (Make/n8n)',
      'Analityka Danych i Raportowanie AI',
      'Wdrożenia ChatGPT / Copilot w Organizacjach',
      'Doradztwo Strategiczne i Audyt Procesów',
    ],
  },
  {
    id: 'education',
    icon: <GraduationCap className="w-5 h-5" />,
    label: 'Szkolenia AI',
    h2: 'Szkolenia AI, Konsultacje i Edukacja Technologiczna',
    description: 'Uczymy ludzi i organizacje, jak wykorzystać pełen potencjał sztucznej inteligencji – od korporacji po dzieci.',
    video: serviceVideoEducation,
    image: imgEducation,
    accentClass: 'text-primary border-primary/40 bg-primary/10',
    subTabs: [
      {
        label: 'Dla Firm',
        items: [
          { title: 'Szkolenia "AI w Biznesie" – warsztaty dla zespołów' },
          { title: 'Transformacja Zespołów i Management 3.0' },
          { title: 'Wdrażanie narzędzi AI w korporacjach' },
          { title: 'Konsultacje strategiczne 1:1 dla kadry zarządzającej' },
        ],
      },
      {
        label: 'Dla Ciebie',
        items: [
          { title: 'Kursy Prompt Engineering – od podstaw do eksperta' },
          { title: 'Budowanie Marki Osobistej z AI' },
          { title: 'Bootcamp dla Freelancerów – monetyzacja AI' },
          { title: 'Tworzenie Treści z AI – tekst, obraz, wideo' },
        ],
      },
      {
        label: '🚀 JUNIOR',
        accent: true,
        items: [
          { title: 'Akademia Młodego Twórcy (10-14 lat)', junior: true },
          { title: 'AI Safety First: Bezpieczeństwo i krytyczne myślenie', junior: true },
          { title: 'Szkoła Promptowania i Logiki dla dzieci', junior: true },
        ],
      },
    ],
  },
  {
    id: 'web',
    icon: <Globe className="w-5 h-5" />,
    label: 'Strony & Branding',
    h2: 'Inteligentne Strony WWW, Chatboty i Nowoczesny Branding',
    description: 'Cyfrowa tożsamość, która aktywnie sprzedaje. Projektujemy strony internetowe zintegrowane z AI, wdrażamy chatboty i budujemy nowoczesne marki.',
    video: serviceVideoWeb,
    image: imgWeb,
    accentClass: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10',
    items: [
      'Projektowanie Stron WWW Zintegrowanych z AI',
      'Wdrożenia Chatbotów i Asystentów Głosowych',
      'Generatywny Branding i Identyfikacja Wizualna',
      'SEO i Pozycjonowanie z Wykorzystaniem AI',
      'Systemy CRM i Marketing Automation',
    ],
  },
];

/* ── Main component ── */

interface ServicesProps {
  serviceSlug?: string;
}

const Services = memo(({ serviceSlug }: ServicesProps) => {
  const resolvedSlug = serviceSlug || 'creative';
  const [activeTab, setActiveTab] = useState(resolvedSlug);
  const [eduSubTab, setEduSubTab] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Sync with URL param
  useEffect(() => {
    if (serviceSlug && services.some(s => s.id === serviceSlug)) {
      setActiveTab(serviceSlug);
      setEduSubTab(0);
    }
  }, [serviceSlug]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.service-tab-trigger',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          stagger: 0.1, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Animate content on tab change
  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );
  }, [activeTab]);

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    setEduSubTab(0);
    navigate(`/services/${id}`, { replace: true });
  };

  const active = services.find(s => s.id === activeTab) || services[0];

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-20 -left-40 w-80 h-80 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 -right-40 w-96 h-96 rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-14 md:mb-18">
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Agencja AI, Automatyzacja i Szkolenia –{' '}
            <span className="text-gradient">Wdrażamy Sztuczną Inteligencję w Biznesie</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto">
            Pionierskie rozwiązania – od wiralowych produkcji wideo, przez automatyzację firm, aż po edukację przyszłych pokoleń.
          </p>
        </div>

        {/* Tab triggers – 4 equal cards with background images */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 max-w-5xl mx-auto mb-6">
          {services.map((s) => {
            const isActive = activeTab === s.id;
            return (
              <button
                key={s.id}
                onClick={() => handleTabClick(s.id)}
                className={`service-tab-trigger group relative rounded-xl overflow-hidden aspect-[4/3] transition-all duration-300 border
                  ${isActive
                    ? 'border-primary/60 shadow-[0_0_30px_hsl(var(--primary)/0.2)] scale-[1.02]'
                    : 'border-border/30 hover:border-primary/30 hover:scale-[1.01]'
                  }`}
              >
                {/* Background image */}
                <img
                  src={s.image}
                  alt={s.label}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Dark overlay */}
                <div className={`absolute inset-0 transition-opacity duration-300 ${
                  isActive ? 'bg-background/70' : 'bg-background/80 group-hover:bg-background/65'
                }`} />

                {/* Content – centered */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full p-4 text-center">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 transition-colors duration-300 backdrop-blur-sm
                    ${isActive ? s.accentClass : 'bg-muted/50 text-muted-foreground'}`}>
                    {s.icon}
                  </div>
                  <h3 className={`font-heading text-sm md:text-base font-semibold transition-colors duration-300
                    ${isActive ? 'text-foreground' : 'text-foreground/70'}`}>
                    {s.label}
                  </h3>
                </div>

                {/* Active indicator arrow */}
                {isActive && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 rotate-45 bg-background/90 border-b border-r border-primary/30 z-20" />
                )}
              </button>
            );
          })}
        </div>

        {/* Expanded content */}
        <div
          ref={contentRef}
          key={activeTab}
          className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden border border-border/30"
        >
          {/* Video background */}
          <video
            key={active.video}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'blur(4px)', transform: 'scale(1.05)' }}
          >
            <source src={active.video} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-background/85" />

          {/* Content */}
          <div className="relative z-10 p-6 md:p-10 lg:p-12">
            <div className="flex items-start gap-4 mb-6">
              <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${active.accentClass}`}>
                {active.icon}
              </div>
              <div>
                <h2 className="font-heading text-xl md:text-2xl lg:text-3xl font-semibold text-foreground">
                  {active.h2}
                </h2>
                <p className="text-muted-foreground mt-2 max-w-2xl">
                  {active.description}
                </p>
              </div>
            </div>

            {/* Items */}
            {active.items && (
              <ul className="grid md:grid-cols-2 gap-3 mt-6">
                {active.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 group/item">
                    <ChevronRight className={`w-5 h-5 shrink-0 mt-0.5 transition-transform group-hover/item:translate-x-1 ${active.accentClass.split(' ')[0]}`} />
                    <span className="text-foreground/90 text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Sub-tabs (Education) */}
            {active.subTabs && (
              <div className="mt-6">
                <div className="flex gap-2 mb-6">
                  {active.subTabs.map((st, i) => (
                    <button
                      key={i}
                      onClick={() => setEduSubTab(i)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border
                        ${st.accent && eduSubTab === i
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-background border-amber-400/50'
                          : eduSubTab === i
                            ? 'bg-primary/20 text-primary border-primary/30'
                            : 'bg-secondary/30 text-muted-foreground border-border/30 hover:border-primary/20'
                        }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  {active.subTabs[eduSubTab].items.map((item, i) => (
                    <div
                      key={i}
                      className={`rounded-xl p-4 border transition-all duration-300 ${
                        item.junior
                          ? 'bg-gradient-to-br from-amber-500/10 to-orange-500/5 border-amber-500/20'
                          : 'bg-secondary/30 border-border/30'
                      }`}
                    >
                      <h3 className={`font-heading text-sm md:text-base font-medium ${
                        item.junior ? 'text-amber-300' : 'text-foreground'
                      }`}>
                        {item.title}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Button */}
            <div className="mt-10 flex justify-center">
              <Link
                to="/contact"
                className="group/cta relative inline-flex items-center gap-3 px-8 py-4 rounded-xl font-heading font-semibold text-base md:text-lg
                  bg-primary/10 border border-primary/40 text-primary backdrop-blur-sm
                  hover:bg-primary/20 hover:border-primary/60 hover:shadow-[0_0_40px_hsl(var(--primary)/0.2)]
                  transition-all duration-300"
              >
                Umów bezpłatną konsultację
                <ArrowRight className="w-5 h-5 transition-transform group-hover/cta:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Services.displayName = 'Services';

export default Services;
