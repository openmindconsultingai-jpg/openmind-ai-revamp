import { Brain, Users, Lightbulb, Target, Zap, Shield, Rocket } from 'lucide-react';
import logo from '@/assets/openmind-logo.webp';
import servicesBackground from '@/assets/services-background.jpg';

const services = [
  {
    icon: Brain,
    title: 'Konsultacje AI dla Biznesu',
    description: 'Analizujemy realne potrzeby Twojej firmy i dobieramy narzędzia sztucznej inteligencji, które naprawdę działają – od automatyzacji powtarzalnych zadań, przez predykcję trendów sprzedażowych, po inteligentną analizę dużych zbiorów danych. AI przestaje być buzzwordem, a staje się Twoim codziennym wsparciem operacyjnym.',
    benefits: ['Automatyzacja procesów', 'Predykcyjna analiza danych', 'Optymalizacja decyzji']
  },
  {
    icon: Users,
    title: 'Szkolenia i Warsztaty AI',
    description: 'Przekazujemy praktyczną wiedzę o tym, czym właściwie jest sztuczna inteligencja – algorytmy, które uczą się z przykładów i podejmują decyzje. Uczymy efektywnego wykorzystania ChatGPT, narzędzi generatywnych i systemów automatyzacji dla firm, instytucji publicznych oraz zespołów. Bez teorii – same konkretne umiejętności.',
    benefits: ['Praktyczne warsztaty', 'Szkolenia dostosowane do branży', 'Gotowe scenariusze użycia']
  },
  {
    icon: Rocket,
    title: 'Działalność z AI w Tydzień',
    description: 'Kompleksowy program praktyczny, w którym jesteśmy Twoim partnerem we wdrożeniu gotowej firmy od zera. W zaledwie siedem dni przejdziesz przez formalności urzędowe, stworzysz profesjonalny branding (stronę www, identyfikację wizualną, grafiki, reels, stories, e-booki, SEO), nauczysz się zdobywać klientów i prowadzić social media – wszystko dzięki sztucznej inteligencji i narzędziom no-code. To rewolucja, która usuwa barierę między przeciętnym użytkownikiem a specjalistami od kodowania.',
    benefits: ['Pomoc w formalnościach urzędowych', 'Kompletny branding i strona WWW', 'Strategie pozyskiwania klientów z AI']
  },
  {
    icon: Lightbulb,
    title: 'Doradztwo Strategiczne',
    description: 'Budujemy kompleksową strategię wdrożenia AI w Twojej organizacji. Pokazujemy, gdzie automatyzacja przyniesie największe korzyści, jak zmierzyć zwrot z inwestycji i jak przeprowadzić transformację cyfrową – krok po kroku, z uwzględnieniem specyfiki Twojego biznesu i realnych możliwości technologicznych.',
    benefits: ['Mapa drogowa wdrożenia', 'Kalkulacja ROI', 'Plan transformacji']
  },
  {
    icon: Target,
    title: 'Personalizowane Rozwiązania AI',
    description: 'Tworzymy dedykowane systemy uczenia maszynowego i przetwarzania języka naturalnego szyte na miarę Twoich potrzeb. Chatboty rozumiejące kontekst, systemy rekomendacji, inteligentna klasyfikacja dokumentów – pokazujemy, jak AI może rozwiązać Twoje konkretne problemy biznesowe, nie tylko technologiczne.',
    benefits: ['Chatboty konwersacyjne', 'Systemy rekomendacji', 'Automatyczna klasyfikacja']
  },
  {
    icon: Zap,
    title: 'Optymalizacja Procesów',
    description: 'Prześwietlamy Twoje procesy i wskazujemy, gdzie AI może zaoszczędzić czas i pieniądze. Identyfikujemy powtarzalne zadania nadające się do automatyzacji, pokazujemy potencjał predykcji i analizy danych. Wynik? Mniej rutyny, więcej wartościowej pracy, konkretne oszczędności operacyjne.',
    benefits: ['Audyt potencjału AI', 'Redukcja kosztów', 'Wzrost efektywności zespołu']
  },
  {
    icon: Shield,
    title: 'Bezpieczeństwo i Etyka AI',
    description: 'Wspieramy w bezpiecznym i etycznym wykorzystaniu sztucznej inteligencji – od polityk ochrony danych osobowych i zgodności z RODO, po świadome zarządzanie algorytmami. Dbamy o to, żeby AI działała zgodnie z prawem i wartościami Twojej organizacji, budując zaufanie klientów i pracowników.',
    benefits: ['Compliance z RODO', 'Audyt bezpieczeństwa AI', 'Etyczne standardy']
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${servicesBackground})`,
            animation: 'slow-zoom 15s ease-in-out infinite alternate'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      </div>
      
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
            sektora publicznego i życia codziennego
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
                  
                  <h3 className="text-2xl font-bold mb-4 text-foreground text-glow-subtle text-center">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed mb-6 text-left">
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
