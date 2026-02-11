import { memo, useState, useCallback } from 'react';
import { 
  Brain, Cpu, Video, GraduationCap, Building2, 
  ChevronDown, ChevronUp
} from 'lucide-react';
import logo from '@/assets/openmind-logo.webp';
import { useLanguage } from '@/contexts/LanguageContext';


// Service category images
import serviceConsulting from '@/assets/service-consulting.jpg';
import serviceDevelopment from '@/assets/service-development.jpg';
import serviceMedia from '@/assets/service-media.jpg';
import serviceAcademy from '@/assets/service-academy.jpg';
import serviceIndustries from '@/assets/service-industries.jpg';

type ExpandedCards = Record<number, boolean>;

interface ServiceItem {
  title: string;
  desc: string;
}

interface ServiceCategory {
  icon: React.ElementType;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  items: ServiceItem[];
  gradient: string;
  image: string;
}

const Services = memo(() => {
  const { language } = useLanguage();
  const [expandedCards, setExpandedCards] = useState<ExpandedCards>({});

  const content = language === 'pl' ? {
    mainTitle: 'Architektura Innowacji: Twoja Przewaga w Erze AI',
    mainSubtitle: 'Jesteśmy pionierami transformacji cyfrowej. Łączymy strategiczny consulting, inżynierię oprogramowania, kreację generatywną i edukację w jeden spójny ekosystem. OpenMind AI Consulting to partner dla wizjonerów, którzy chcą wyprzedzić rynek.',
    expand: 'Rozwiń szczegóły',
    collapse: 'Zwiń',
    categories: [
      {
        icon: Brain,
        number: '01',
        title: 'Consulting & Strategy',
        subtitle: 'Fundament bezpiecznej i rentownej transformacji',
        description: 'Nie wdrażamy technologii dla samej technologii. Projektujemy strategie, które rozwiązują realne problemy biznesowe, minimalizują ryzyko i maksymalizują ROI. Twoja podróż ku AI zaczyna się od mapy drogowej.',
        items: [
          { title: 'Holistyczny Audyt Gotowości AI (AI Maturity Assessment)', desc: 'Przeprowadzamy głęboką analizę Twojej infrastruktury danych, procesów operacyjnych i kompetencji zespołów. Identyfikujemy "wąskie gardła", które AI może odblokować natychmiast, oraz budujemy długofalową strategię adopcji technologii.' },
          { title: 'Strategia Transformacji Cyfrowej', desc: 'Opracowujemy kompleksowe plany wdrożeniowe, które integrują sztuczną inteligencję z DNA Twojej firmy. Od restrukturyzacji przepływu pracy po nowe modele biznesowe oparte na danych.' },
          { title: 'AI Ethics, Compliance & Security', desc: 'Innowacja wymaga bezpieczeństwa. Zapewniamy pełne wsparcie w zakresie zgodności z regulacjami (EU AI Act, RODO/GDPR), etyki algorytmicznej oraz cyberbezpieczeństwa systemów opartych na LLM. Chronimy Twój know-how przed wyciekiem.' }
        ],
        gradient: 'from-blue-500/20 via-cyan-500/10 to-transparent',
        image: serviceConsulting
      },
      {
        icon: Cpu,
        number: '02',
        title: 'AI Development & Automation',
        subtitle: 'Skalowalne technologie i cyfrowa siła robocza',
        description: 'Tworzymy "silnik" Twojego biznesu. Nasz dział deweloperski buduje zaawansowane systemy, które działają autonomicznie, uwalniając ludzki potencjał do zadań kreatywnych i strategicznych.',
        items: [
          { title: 'Agentic AI Development (Autonomiczne Agenty)', desc: 'Wchodzimy w erę post-chatbotową. Projektujemy i wdrażamy Autonomiczne Agenty AI, które nie tylko "rozmawiają", ale "działają". Twoi nowi cyfrowi pracownicy potrafią samodzielnie realizować złożone sekwencje zadań: od researchu rynkowego, przez negocjacje zakupowe, aż po zarządzanie logistyką – 24/7, bez nadzoru.' },
          { title: 'Next-Gen Voice AI Assistants', desc: 'Zastępujemy przestarzałe IVR hiper-realistyczną konwersacją. Nasze boty głosowe prowadzą płynne dialogi z ludzką intonacją i empatią: Sales & Lead Gen, HR & Recruitment, Customer Excellence w wielu językach.' },
          { title: 'Custom LLM & Enterprise Chatbots', desc: 'Budujemy "Mózg Firmy". Trenujemy i dostrajamy (fine-tuning) modele językowe na Twoich wewnętrznych danych. Otrzymujesz bezpiecznego, prywatnego asystenta, który zna każdą procedurę w Twojej firmie.' },
          { title: 'Hiperautomatyzacja (Hyperautomation Ecosystems)', desc: 'Łączymy izolowane systemy (CRM, ERP, Slack, Email) w jeden inteligentny organizm. Wykorzystujemy zaawansowane skrypty i AI, aby zautomatyzować nawet najbardziej nieliniowe i skomplikowane procesy biurowe.' }
        ],
        gradient: 'from-violet-500/20 via-purple-500/10 to-transparent',
        image: serviceDevelopment
      },
      {
        icon: Video,
        number: '03',
        title: 'Generative Media Studio',
        subtitle: 'Produkcja wizualna przyszłości (100% AI)',
        description: 'Jako jedni z nielicznych na rynku oferujemy studio produkcyjne nowej generacji. Wykorzystujemy modele Sora 2, Veo 3.1, Kling oraz NanoBanana, aby tworzyć content klasy kinowej bez fizycznych ograniczeń.',
        items: [
          { title: 'High-End AI Video Production', desc: 'Tworzymy spektakularne formy wideo bez kamer, aktorów i kosztownych planów zdjęciowych. Reklamy i Spoty TV, Teledyski i Formy Artystyczne, Storytelling Korporacyjny w oparciu o Veo 3.1 i Sora 2.' },
          { title: 'Virtual Identity & Digital Humans', desc: 'Kreujemy cyfrowe tożsamości. Od Wirtualnego Influencera, który stanie się twarzą marki, po Digital Twin prezesa firmy, który może "występować" w tysiącach spersonalizowanych wiadomości wideo jednocześnie.' },
          { title: 'Viral Content Automation Pipelines', desc: 'Fabryki treści dla mediów społecznościowych. Wdrażamy systemy, które zautomatyzowanie monitorują trendy, generują scenariusze, tworzą wideo (Shorts/Reels/TikTok) i publikują je.' },
          { title: 'Globalizacja Contentu (AI Dubbing)', desc: 'Złam bariery językowe. Automatycznie tłumaczymy i dubbingujemy Twoje materiały wideo na 50+ języków, zachowując oryginalną barwę głosu i synchronizację ruchu warg (lip-sync).' },
          { title: 'Grafika i Design z NanoBanana', desc: 'Wykorzystujemy zaawansowane możliwości modelu NanoBanana oraz innych topowych narzędzi do generowania spójnych systemów identyfikacji wizualnej, assetów do gier i materiałów marketingowych.' }
        ],
        gradient: 'from-rose-500/20 via-pink-500/10 to-transparent',
        image: serviceMedia
      },
      {
        icon: GraduationCap,
        number: '04',
        title: 'AI Academy & Bespoke Training',
        subtitle: 'Transfer wiedzy i budowanie kompetencji',
        description: 'Technologia jest tak skuteczna, jak ludzie, którzy jej używają. Nasza Akademia to nie generyczne kursy wideo, ale dedykowane programy szkoleniowe "szyte na miarę" (Bespoke), odpowiadające na specyficzne potrzeby Twojej organizacji.',
        items: [
          { title: 'On-Demand Bespoke Training', desc: 'Ty wskazujesz cel, my dostarczamy know-how. Niezależnie czy potrzebujesz warsztatu z "AI w projektowaniu biżuterii", "Analizy danych prawnych" czy "Automatyzacji w rolnictwie" – nasi eksperci opracują unikalny program szkoleniowy dla Twojej niszy.' },
          { title: 'Corporate AI Upskilling', desc: 'Systemowe podnoszenie kwalifikacji całych departamentów: Dla Marketingu – tworzenie kampanii 360° z Generative AI. Dla Deweloperów – efektywne programowanie z AI. Dla HR – automatyzacja procesów rekrutacyjnych.' },
          { title: 'Executive AI Mentoring', desc: 'Elitarne sesje dla Kadry Zarządzającej (C-Level). Uczymy liderów, jak podejmować strategiczne decyzje w oparciu o AI, jak zarządzać zmianą w organizacji i jak identyfikować nowe modele przychodowe.' },
          { title: 'Creative AI Lab', desc: 'Praktyczne warsztaty kreatywne. Uczymy Twój zespół in-house, jak samodzielnie obsługiwać narzędzia takie jak NanoBanana, Kling czy Veo, aby uniezależnić firmę od zewnętrznych agencji.' }
        ],
        gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
        image: serviceAcademy
      },
      {
        icon: Building2,
        number: '05',
        title: 'Industries (Specjalizacje Branżowe)',
        subtitle: 'Dedykowane rozwiązania dla Twojego sektora',
        description: 'Nie wierzymy w uniwersalne algorytmy do wszystkiego. Dostarczamy precyzyjne narzędzia AI, które rozumieją specyfikę, słownictwo i procesy Twojej branży. Zobacz, gdzie już dziś budujemy przewagę konkurencyjną.',
        items: [
          { title: '🩺 Medycyna i Ochrona Zdrowia', desc: 'Automatyczna Transkrypcja Wizyt (Medical Scribe), Analiza Dokumentacji, Wirtualna Rejestracja – uwalniamy specjalistów od biurokracji, pozwalając im skupić się na pacjencie.' },
          { title: '🛍️ E-commerce i Nowoczesny Retail', desc: 'Inteligentne Rekomendacje, Automatyzacja Opisów Produktowych (SEO), Wirtualne Przymierzalnie (VTON), Obsługa Zwrotów i Reklamacji – maksymalizacja konwersji dzięki hiper-personalizacji.' },
          { title: '🏠 Nieruchomości, Architektura i Deweloperzy', desc: 'AI Home Staging, Automatyzacja Najmu, Generowanie Wizualizacji – wizualizuj marzenia klientów, zanim powstaną.' },
          { title: '⚖️ Prawo, Administracja i HR', desc: 'Analiza Umów (Legal Tech), AI w Rekrutacji, Asystenci Compliance – bezpieczna praca z tekstem i ludźmi.' },
          { title: '🎬 Marketing, Media i Rozrywka', desc: 'Automatyzacja Social Media, Personalizowane Wideo Marketingowe, Generowanie Contentu – nieskończona kreatywność napędzana technologią.' },
          { title: '🎓 Edukacja i Szkolenia (EdTech)', desc: 'Spersonalizowani Tutorzy AI, Automatyczne Tworzenie Kursów, Wsparcie Językowe – nauczanie dopasowane do ucznia, nie do grupy.' },
          { title: '🏭 Logistyka, Produkcja i Przemysł', desc: 'Predykcyjne Utrzymanie Ruchu, Optymalizacja Tras, Zarządzanie Magazynem – optymalizacja łańcucha dostaw i zasobów.' },
          { title: '✈️ Turystyka i HoReCa', desc: 'Wirtualny Concierge, Dynamiczne Ceny, Wielojęzyczna Obsługa Gości – luksusowa obsługa gościa na autopilocie.' }
        ],
        gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
        image: serviceIndustries
      }
    ] as ServiceCategory[]
  } : {
    mainTitle: 'Architecture of Innovation: Your Edge in the AI Era',
    mainSubtitle: 'We are pioneers of digital transformation. We combine strategic consulting, software engineering, generative creation, and education into one cohesive ecosystem. OpenMind AI Consulting is a partner for visionaries who want to stay ahead of the market.',
    expand: 'Expand details',
    collapse: 'Collapse',
    categories: [
      {
        icon: Brain,
        number: '01',
        title: 'Consulting & Strategy',
        subtitle: 'Foundation for safe and profitable transformation',
        description: 'We don\'t implement technology for technology\'s sake. We design strategies that solve real business problems, minimize risk, and maximize ROI. Your AI journey starts with a roadmap.',
        items: [
          { title: 'Holistic AI Readiness Audit (AI Maturity Assessment)', desc: 'We conduct deep analysis of your data infrastructure, operational processes, and team competencies. We identify "bottlenecks" that AI can unlock immediately and build a long-term technology adoption strategy.' },
          { title: 'Digital Transformation Strategy', desc: 'We develop comprehensive implementation plans that integrate artificial intelligence with your company\'s DNA. From workflow restructuring to new data-driven business models.' },
          { title: 'AI Ethics, Compliance & Security', desc: 'Innovation requires security. We provide full support in regulatory compliance (EU AI Act, GDPR), algorithmic ethics, and cybersecurity of LLM-based systems. We protect your know-how from leakage.' }
        ],
        gradient: 'from-blue-500/20 via-cyan-500/10 to-transparent',
        image: serviceConsulting
      },
      {
        icon: Cpu,
        number: '02',
        title: 'AI Development & Automation',
        subtitle: 'Scalable technologies and digital workforce',
        description: 'We create the "engine" of your business. Our development team builds advanced systems that operate autonomously, freeing human potential for creative and strategic tasks.',
        items: [
          { title: 'Agentic AI Development (Autonomous Agents)', desc: 'We\'re entering the post-chatbot era. We design and implement Autonomous AI Agents that don\'t just "talk" but "act". Your new digital employees can independently execute complex task sequences: from market research, through purchasing negotiations, to logistics management – 24/7, without supervision.' },
          { title: 'Next-Gen Voice AI Assistants', desc: 'We replace outdated IVR with hyper-realistic conversation. Our voice bots conduct smooth dialogues with human intonation and empathy: Sales & Lead Gen, HR & Recruitment, Customer Excellence in multiple languages.' },
          { title: 'Custom LLM & Enterprise Chatbots', desc: 'We build the "Company Brain". We train and fine-tune language models on your internal data. You get a secure, private assistant that knows every procedure in your company.' },
          { title: 'Hyperautomation Ecosystems', desc: 'We connect isolated systems (CRM, ERP, Slack, Email) into one intelligent organism. We use advanced scripts and AI to automate even the most non-linear and complex office processes.' }
        ],
        gradient: 'from-violet-500/20 via-purple-500/10 to-transparent',
        image: serviceDevelopment
      },
      {
        icon: Video,
        number: '03',
        title: 'Generative Media Studio',
        subtitle: 'Visual production of the future (100% AI)',
        description: 'As one of the few on the market, we offer a next-generation production studio. We use Sora 2, Veo 3.1, Kling, and NanoBanana models to create cinema-class content without physical limitations.',
        items: [
          { title: 'High-End AI Video Production', desc: 'We create spectacular video content without cameras, actors, and expensive sets. TV Ads and Spots, Music Videos and Art Forms, Corporate Storytelling based on Veo 3.1 and Sora 2.' },
          { title: 'Virtual Identity & Digital Humans', desc: 'We create digital identities. From a Virtual Influencer who will become the face of the brand, to a Digital Twin of the CEO who can "appear" in thousands of personalized video messages simultaneously.' },
          { title: 'Viral Content Automation Pipelines', desc: 'Content factories for social media. We implement systems that automatically monitor trends, generate scripts, create videos (Shorts/Reels/TikTok), and publish them.' },
          { title: 'Content Globalization (AI Dubbing)', desc: 'Break language barriers. We automatically translate and dub your video content into 50+ languages, preserving the original voice timbre and lip-sync.' },
          { title: 'Graphics and Design with NanoBanana', desc: 'We use advanced capabilities of NanoBanana and other top tools to generate cohesive visual identity systems, game assets, and marketing materials.' }
        ],
        gradient: 'from-rose-500/20 via-pink-500/10 to-transparent',
        image: serviceMedia
      },
      {
        icon: GraduationCap,
        number: '04',
        title: 'AI Academy & Bespoke Training',
        subtitle: 'Knowledge transfer and competence building',
        description: 'Technology is only as effective as the people who use it. Our Academy is not generic video courses, but dedicated "bespoke" training programs tailored to your organization\'s specific needs.',
        items: [
          { title: 'On-Demand Bespoke Training', desc: 'You set the goal, we deliver the know-how. Whether you need a workshop on "AI in jewelry design", "Legal data analysis", or "Automation in agriculture" – our experts will develop a unique training program for your niche.' },
          { title: 'Corporate AI Upskilling', desc: 'Systematic upskilling of entire departments: For Marketing – creating 360° campaigns with Generative AI. For Developers – effective programming with AI. For HR – automation of recruitment processes.' },
          { title: 'Executive AI Mentoring', desc: 'Elite sessions for C-Level Management. We teach leaders how to make strategic decisions based on AI, how to manage organizational change, and how to identify new revenue models.' },
          { title: 'Creative AI Lab', desc: 'Practical creative workshops. We teach your in-house team how to independently use tools like NanoBanana, Kling, or Veo to make the company independent from external agencies.' }
        ],
        gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
        image: serviceAcademy
      },
      {
        icon: Building2,
        number: '05',
        title: 'Industries (Sector Specializations)',
        subtitle: 'Dedicated solutions for your sector',
        description: 'We don\'t believe in universal algorithms for everything. We deliver precise AI tools that understand the specifics, vocabulary, and processes of your industry. See where we\'re building competitive advantage today.',
        items: [
          { title: '🩺 Medicine and Healthcare', desc: 'Automatic Visit Transcription (Medical Scribe), Documentation Analysis, Virtual Registration – freeing specialists from bureaucracy to focus on patients.' },
          { title: '🛍️ E-commerce and Modern Retail', desc: 'Intelligent Recommendations, Product Description Automation (SEO), Virtual Try-On (VTON), Returns and Claims Handling – conversion maximization through hyper-personalization.' },
          { title: '🏠 Real Estate, Architecture and Developers', desc: 'AI Home Staging, Rental Automation, Visualization Generation – visualize clients\' dreams before they exist.' },
          { title: '⚖️ Law, Administration and HR', desc: 'Contract Analysis (Legal Tech), AI in Recruitment, Compliance Assistants – secure work with text and people.' },
          { title: '🎬 Marketing, Media and Entertainment', desc: 'Social Media Automation, Personalized Video Marketing, Content Generation – infinite creativity powered by technology.' },
          { title: '🎓 Education and Training (EdTech)', desc: 'Personalized AI Tutors, Automatic Course Creation, Language Support – teaching tailored to the student, not the group.' },
          { title: '🏭 Logistics, Production and Industry', desc: 'Predictive Maintenance, Route Optimization, Warehouse Management – supply chain and resource optimization.' },
          { title: '✈️ Tourism and HoReCa', desc: 'Virtual Concierge, Dynamic Pricing, Multilingual Guest Service – luxury guest service on autopilot.' }
        ],
        gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
        image: serviceIndustries
      }
    ] as ServiceCategory[]
  };

  const toggleCard = useCallback((index: number) => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  }, []);

  return (
    <section id="services" className="pt-20 md:pt-24 pb-20 md:pb-32 relative overflow-hidden">
      <div className="absolute inset-0">
        
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </div>
      
      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="OpenMind AI" className="h-14 md:h-16 opacity-80" loading="lazy" />
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-5xl mx-auto leading-tight">
            <span className="text-gradient">{content.mainTitle}</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            {content.mainSubtitle}
          </p>
        </div>

        {/* Service Categories - Full Width Stack */}
        <div className="flex flex-col gap-6 md:gap-8">
          {content.categories.map((category, index) => {
            const isExpanded = expandedCards[index];
            const IconComponent = category.icon;
            
            return (
              <div
                key={index}
                className="group relative"
              >
                <div 
                  className={`relative rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-300 bg-card/40 backdrop-blur-sm border border-border/30 hover:border-border/50`}
                  style={{
                    boxShadow: `0 0 0 1px hsl(0 0% 100% / 0.05), 0 25px 50px -20px hsl(0 0% 0% / 0.4)`,
                  }}
                >
                  {/* Background Image */}
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                    loading="lazy"
                  />
                  
                  {/* Gradient accent */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-60`} />
                  <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/40" />
                  
                  {/* Content */}
                  <div className="relative p-6 md:p-10 lg:p-12 flex flex-col lg:flex-row gap-6 lg:gap-10">
                    {/* Left side - Text content */}
                    <div className="flex-1">
                      {/* Header Row */}
                      <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8 mb-6">
                        {/* Number & Icon */}
                        <div className="flex items-center gap-4 md:gap-6">
                          <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary/30 font-heading">
                            {category.number}
                          </span>
                          <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                            <IconComponent className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                          </div>
                        </div>
                        
                        {/* Title & Subtitle */}
                        <div className="flex-1">
                          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 font-heading">
                            {category.title}
                          </h3>
                          <p className="text-lg md:text-xl text-primary font-medium">
                            {category.subtitle}
                          </p>
                        </div>
                      </div>
                      
                      {/* Description */}
                      <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6 max-w-3xl">
                        {category.description}
                      </p>
                    
                      {/* Expandable Items */}
                      <div 
                        className={`grid gap-4 transition-all duration-300 overflow-hidden ${
                          isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        {category.items.map((item, itemIndex) => (
                          <div 
                            key={itemIndex}
                            className="p-4 md:p-6 rounded-xl bg-background/40 border border-border/20 hover:border-border/40 transition-colors"
                          >
                            <h4 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                              {item.title}
                            </h4>
                            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                      
                      {/* Expand/Collapse Button */}
                      <button
                        onClick={() => toggleCard(index)}
                        className="mt-6 flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium text-base md:text-lg"
                      >
                        <span>{isExpanded ? content.collapse : content.expand}</span>
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                    </div>
                    
                    {/* Right side - Featured Image */}
                    <div className="hidden lg:block w-80 xl:w-96 flex-shrink-0">
                      <div className="relative h-full min-h-[280px] rounded-2xl overflow-hidden">
                        <img 
                          src={category.image} 
                          alt={category.title}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-40`} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

Services.displayName = 'Services';

export default Services;
