import { memo, useState, useRef, useEffect } from 'react';
import { Video, Bot, GraduationCap, Globe, Check } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Services = memo(() => {
  const [activeTab, setActiveTab] = useState('firms');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.service-card',
        { opacity: 0, y: 50, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1,
          stagger: 0.12, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-20 -left-40 w-80 h-80 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 -right-40 w-96 h-96 rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16 md:mb-20">
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Agencja AI, Automatyzacja i Szkolenia –{' '}
            <span className="text-gradient">Wdrażamy Sztuczną Inteligencję w Biznesie</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto text-center-override">
            Pionierskie rozwiązania – od wiralowych produkcji wideo, przez automatyzację firm, aż po edukację przyszłych pokoleń.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">

          {/* CARD 1 - Creative */}
          <ServiceCard
            icon={<Video className="w-6 h-6" />}
            accentColor="from-rose-500/20 to-pink-600/10"
            glowColor="rose-500"
            iconBg="bg-rose-500/10 text-rose-400"
          >
            <h2 className="font-heading text-xl md:text-2xl font-semibold text-foreground mb-2">
              Agencja Kreatywna AI: Wideo Marketing, Teledyski i Virale
            </h2>
            <p className="text-muted-foreground text-sm mb-5">
              Tworzymy historie, które algorytmy kochają.
            </p>
            <ul className="space-y-3">
              <ListItem>Produkcja Wideo i Teledysków AI (Sora/Runway)</ListItem>
              <ListItem>Wiralowe Rolki i TikToki (Short Form Video)</ListItem>
              <ListItem>Wirtualni Influencerzy i Cyfrowi Ambasadorzy</ListItem>
            </ul>
          </ServiceCard>

          {/* CARD 2 - Automation */}
          <ServiceCard
            icon={<Bot className="w-6 h-6" />}
            accentColor="from-violet-500/20 to-blue-600/10"
            glowColor="violet-500"
            iconBg="bg-violet-500/10 text-violet-400"
          >
            <h2 className="font-heading text-xl md:text-2xl font-semibold text-foreground mb-2">
              Automatyzacja Procesów Biznesowych i Wdrażanie Aplikacji AI
            </h2>
            <p className="text-muted-foreground text-sm mb-5">
              Zamieniamy ludzką pracę na inteligentne systemy.
            </p>
            <ul className="space-y-3">
              <ListItem>Budowa Dedykowanych Aplikacji AI dla Firm</ListItem>
              <ListItem>Automatyzacja Workflow i Integracja (Make/n8n)</ListItem>
              <ListItem>Analityka Danych i Raportowanie AI</ListItem>
            </ul>
          </ServiceCard>

          {/* CARD 3 - Education (full width, with tabs) */}
          <div className="service-card md:col-span-2 group">
            <div className="relative h-full rounded-2xl glass p-6 md:p-8 overflow-hidden transition-all duration-500 hover:scale-[1.01] hover:shadow-[0_0_60px_hsl(176_100%_43%/0.15)]">
              {/* Gradient accent */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

              <div className="relative z-10">
                {/* Icon + Title */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="font-heading text-xl md:text-2xl font-semibold text-foreground">
                      Szkolenia AI, Konsultacje i Edukacja Technologiczna
                    </h2>
                  </div>
                </div>

                {/* Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="w-full md:w-auto bg-secondary/50 backdrop-blur-sm border border-border/50 p-1 rounded-xl mb-6">
                    <TabsTrigger
                      value="firms"
                      className="rounded-lg data-[state=active]:bg-primary/20 data-[state=active]:text-primary px-5 py-2 text-sm font-medium"
                    >
                      Dla Firm
                    </TabsTrigger>
                    <TabsTrigger
                      value="personal"
                      className="rounded-lg data-[state=active]:bg-primary/20 data-[state=active]:text-primary px-5 py-2 text-sm font-medium"
                    >
                      Dla Ciebie
                    </TabsTrigger>
                    <TabsTrigger
                      value="junior"
                      className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-400 data-[state=active]:to-orange-500 data-[state=active]:text-background px-5 py-2 text-sm font-medium"
                    >
                      🚀 JUNIOR
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="firms" className="mt-0">
                    <div className="grid md:grid-cols-3 gap-4">
                      <TabCard title='Szkolenia "AI w Biznesie"' />
                      <TabCard title="Transformacja Zespołów i Management 3.0" />
                      <TabCard title="Wdrażanie narzędzi w korporacjach" />
                    </div>
                  </TabsContent>

                  <TabsContent value="personal" className="mt-0">
                    <div className="grid md:grid-cols-3 gap-4">
                      <TabCard title="Kursy Prompt Engineering" />
                      <TabCard title="Budowanie Marki Osobistej z AI" />
                      <TabCard title="Bootcamp dla Freelancerów" />
                    </div>
                  </TabsContent>

                  <TabsContent value="junior" className="mt-0">
                    <div className="grid md:grid-cols-3 gap-4">
                      <TabCard
                        title="Akademia Młodego Twórcy (10-14 lat)"
                        junior
                      />
                      <TabCard
                        title="AI Safety First: Bezpieczeństwo i krytyczne myślenie"
                        junior
                      />
                      <TabCard
                        title="Szkoła Promptowania i Logiki dla dzieci"
                        junior
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>

          {/* CARD 4 - Web & Brand (full width) */}
          <ServiceCard
            icon={<Globe className="w-6 h-6" />}
            accentColor="from-emerald-500/20 to-teal-600/10"
            glowColor="emerald-500"
            iconBg="bg-emerald-500/10 text-emerald-400"
            className="md:col-span-2"
          >
            <h2 className="font-heading text-xl md:text-2xl font-semibold text-foreground mb-2">
              Inteligentne Strony WWW, Chatboty i Nowoczesny Branding
            </h2>
            <p className="text-muted-foreground text-sm mb-5">
              Cyfrowa tożsamość, która aktywnie sprzedaje.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-foreground/90 text-sm">Projektowanie Stron WWW Zintegrowanych z AI</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-foreground/90 text-sm">Wdrożenia Chatbotów i Asystentów Głosowych</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-foreground/90 text-sm">Generatywny Branding i Identyfikacja Wizualna</span>
              </div>
            </div>
          </ServiceCard>
        </div>
      </div>
    </section>
  );
});

Services.displayName = 'Services';

/* ── Reusable sub-components ───────────────────────────────────── */

function ServiceCard({
  icon,
  accentColor,
  glowColor,
  iconBg,
  className = '',
  children,
}: {
  icon: React.ReactNode;
  accentColor: string;
  glowColor: string;
  iconBg: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`service-card group ${className}`}>
      <div
        className={`relative h-full rounded-2xl glass p-6 md:p-8 overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_60px_hsl(176_100%_43%/0.12)]`}
      >
        {/* Hover gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}
        />

        <div className="relative z-10">
          <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center mb-5`}>
            {icon}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
      <span className="text-foreground/90 text-sm">{children}</span>
    </li>
  );
}

function TabCard({ title, junior = false }: { title: string; junior?: boolean }) {
  return (
    <div
      className={`rounded-xl p-4 border transition-all duration-300 ${
        junior
          ? 'bg-gradient-to-br from-amber-500/10 to-orange-500/5 border-amber-500/20 hover:border-amber-400/40'
          : 'bg-secondary/30 border-border/30 hover:border-primary/30'
      }`}
    >
      <h3 className={`font-heading text-sm font-medium ${junior ? 'text-amber-300' : 'text-foreground'}`}>
        {title}
      </h3>
    </div>
  );
}

export default Services;
