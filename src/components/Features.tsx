import { CheckCircle2, Users, Globe } from 'lucide-react';

const features = [
  {
    icon: CheckCircle2,
    title: 'Personalizacja i prostota',
    description: 'Dopasowujemy narzędzia AI do Twoich realnych potrzeb – bez technicznego żargonu i zbędnych komplikacji. Oferujemy zrozumiałe, gotowe do użycia rozwiązania.',
  },
  {
    icon: Users,
    title: 'Dla firm, rodzin i szkół',
    description: 'Niezależnie, czy prowadzisz biznes, jesteś rodzicem, czy nauczycielem – pokażemy Ci, jak wykorzystać sztuczną inteligencję, by działać efektywniej i zyskać czas.',
  },
  {
    icon: Globe,
    title: 'Polskie know-how + globalne technologie',
    description: 'Łączymy znajomość lokalnych wyzwań z najnowszymi możliwościami AI. Dzięki temu otrzymujesz skuteczne wsparcie oparte na sprawdzonych narzędziach.',
  },
];

const Features = () => {
  return (
    <section id="services" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-gradient transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
