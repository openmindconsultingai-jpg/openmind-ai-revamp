import { Brain, Users, Lightbulb, Target, Zap, Shield } from 'lucide-react';
import logo from '@/assets/openmind-logo.webp';

const services = [
  {
    icon: Brain,
    title: 'Konsultacje AI dla Biznesu',
    description: 'Analiza potrzeb firmowych i dobór optymalnych rozwiązań AI zwiększających efektywność operacyjną. Implementacja narzędzi automatyzacji procesów, analizy danych i predykcji biznesowych.',
    benefits: ['Automatyzacja procesów', 'Analiza danych', 'Predykcja trendów']
  },
  {
    icon: Users,
    title: 'Szkolenia i Warsztaty AI',
    description: 'Kompleksowe programy edukacyjne dla firm, szkół i instytucji. Praktyczne warsztaty nauczające wykorzystania ChatGPT, narzędzi do generowania grafik i automatyzacji codziennych zadań.',
    benefits: ['Warsztaty praktyczne', 'Szkolenia indywidualne', 'Materiały online']
  },
  {
    icon: Lightbulb,
    title: 'Doradztwo Strategiczne',
    description: 'Opracowanie strategii wdrożenia AI w organizacji. Identyfikacja obszarów do automatyzacji, ocena ROI inwestycji w AI oraz wsparcie w transformacji cyfrowej przedsiębiorstwa.',
    benefits: ['Strategia wdrożenia', 'Analiza ROI', 'Transformacja cyfrowa']
  },
  {
    icon: Target,
    title: 'Personalizowane Rozwiązania',
    description: 'Tworzenie dedykowanych systemów AI dostosowanych do specyficznych potrzeb klienta. Od chatbotów po zaawansowane systemy analizy i przetwarzania danych biznesowych.',
    benefits: ['Chatboty AI', 'Systemy analityczne', 'Integracje API']
  },
  {
    icon: Zap,
    title: 'Optymalizacja Procesów',
    description: 'Audyt istniejących procesów i identyfikacja możliwości wykorzystania AI. Wdrożenie narzędzi zwiększających produktywność i redukujących koszty operacyjne.',
    benefits: ['Audyt procesów', 'Redukcja kosztów', 'Wzrost produktywności']
  },
  {
    icon: Shield,
    title: 'Bezpieczeństwo i Etyka AI',
    description: 'Doradztwo w zakresie bezpiecznego i etycznego wykorzystania sztucznej inteligencji. Implementacja polityk bezpieczeństwa danych i zgodności z regulacjami RODO.',
    benefits: ['Zgodność z RODO', 'Polityki bezpieczeństwa', 'Etyka AI']
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="OpenMind AI" className="h-16 opacity-80" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient text-glow">Nasze Usługi</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Kompleksowe rozwiązania AI dostosowane do potrzeb nowoczesnych organizacji, 
            edukacji i życia codziennego
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group relative animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative bg-card border border-border rounded-2xl p-8 h-full hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-foreground text-glow-subtle">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="space-y-2">
                    {service.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
