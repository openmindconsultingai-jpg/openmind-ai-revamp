import { CheckCircle2, Users, Globe } from 'lucide-react';

const features = [
  {
    icon: CheckCircle2,
    title: 'Personalizacja i prostota',
    description: 'Dopasowujemy inteligentne algorytmy do Twoich realnych wyzwań – bez technicznego żargonu. AI to dla nas nie abstrakcja, ale narzędzie, które naprawdę ułatwia codzienną pracę i oszczędza czas.',
  },
  {
    icon: Users,
    title: 'Dla biznesu, administracji i życia codziennego',
    description: 'Sztuczna inteligencja to systemy, które uczą się z danych i podejmują decyzje – automatyzują rutynę, analizują trendy, odpowiadają na pytania. Pokażemy Ci, jak używać ich efektywnie, niezależnie czy zarządzasz firmą, instytucją publiczną, czy po prostu chcesz działać mądrzej w swoim życiu.',
  },
  {
    icon: Globe,
    title: 'Polskie know-how + globalne technologie',
    description: 'Wykorzystujemy najnowsze modele językowe i narzędzia uczenia maszynowego od liderów branży, dostosowując je do lokalnych potrzeb. Przekładamy światową innowację na praktyczne korzyści dla polskich organizacji i użytkowników.',
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
                  
                  <h3 className="text-2xl font-bold mb-4 text-foreground text-glow-subtle group-hover:text-gradient transition-colors">
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
