import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    title: 'Konsulting AI i wdrożenia SI w Polsce',
    content:
      'Nie wiesz jak zacząć z sztuczną inteligencją? OpenMind AI przeprowadzi Cię przez cały proces – od audytu potrzeb, przez dobór narzędzi AI/SI, aż po pełne wdrożenie i szkolenie zespołu. Pomagamy firmom każdej wielkości wejść w świat sztucznej inteligencji bez zbędnego ryzyka.',
  },
  {
    title: 'Szkolenia ze Sztucznej Inteligencji (AI i SI)',
    content:
      'Nasze szkolenia AI/SI to praktyczna wiedza bez zbędnej teorii. Uczymy jak używać ChatGPT, automatyzować procesy, tworzyć obrazy i wideo przy pomocy sztucznej inteligencji. Szkolenia dostępne online i stacjonarnie w całej Polsce – dla firm, agencji i szkół.',
  },
  {
    title: 'Automatyzacja Procesów ze Sztuczną Inteligencją',
    content:
      'Sztuczna inteligencja (AI/SI) może przejąć powtarzalne zadania w Twojej firmie – obsługę klienta, generowanie raportów, analizę danych i więcej. OpenMind AI projektuje i wdraża automatyzacje oparte na AI, które realnie oszczędzają czas i pieniądze.',
  },
  {
    title: 'Agencja Kreatywna AI – Wideo i Obrazy generowane przez SI',
    content:
      'Tworzymy profesjonalne materiały reklamowe z wykorzystaniem sztucznej inteligencji: wideo AI, obrazy AI, animacje i content dla mediów społecznościowych. Generatywna AI (SI) otwiera nowe możliwości dla Twojej marki – szybciej i taniej niż tradycyjne metody.',
  },
  {
    title: 'Sztuczna Inteligencja dla Szkół i Edukacji',
    content:
      'OpenMind AI wspiera szkoły i nauczycieli w Polsce we wdrożeniu AI/SI do edukacji. Prowadzimy warsztaty dla uczniów, szkolenia dla nauczycieli i pomagamy placówkom zrozumieć i bezpiecznie wykorzystać sztuczną inteligencję w nauczaniu.',
  },
];

const faqItems = [
  {
    question: 'Czym różni się AI od SI?',
    answer:
      'AI (Artificial Intelligence) i SI (Sztuczna Inteligencja) to dokładnie to samo pojęcie – angielskie i polskie określenie tej samej technologii. OpenMind AI używa obu terminów, pomagając firmom i szkołom w całej Polsce wdrażać rozwiązania oparte na sztucznej inteligencji.',
  },
  {
    question: 'Jak sztuczna inteligencja może pomóc mojej firmie?',
    answer:
      'AI/SI automatyzuje powtarzalne zadania, analizuje dane, obsługuje klientów przez chatboty, generuje treści marketingowe i wspiera podejmowanie decyzji. OpenMind AI pomoże zidentyfikować obszary, w których sztuczna inteligencja przyniesie Twojej firmie największe korzyści.',
  },
  {
    question: 'Czy szkolenia AI są dla każdego?',
    answer:
      'Tak! Nasze szkolenia ze sztucznej inteligencji są dostosowane do różnych poziomów zaawansowania – od podstaw dla osób bez doświadczenia technicznego, po zaawansowane warsztaty dla specjalistów IT. Szkolimy firmy, nauczycieli i pracowników administracji.',
  },
  {
    question: 'Ile kosztuje wdrożenie AI/SI?',
    answer:
      'Koszt zależy od zakresu projektu. Oferujemy bezpłatną konsultację, podczas której oceniamy potrzeby i przedstawiamy wycenę. Nasze rozwiązania AI/SI są skalowalne – możesz zacząć od małego projektu pilotażowego i rozwijać go w miarę potrzeb.',
  },
  {
    question: 'Czy AI zastąpi moich pracowników?',
    answer:
      'Sztuczna inteligencja nie zastępuje ludzi – wspiera ich. AI/SI przejmuje powtarzalne, czasochłonne zadania, dzięki czemu pracownicy mogą skupić się na kreatywnej i strategicznej pracy. Nasze wdrożenia zawsze uwzględniają szkolenie zespołu.',
  },
];

const FaqItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: 'linear-gradient(145deg, hsl(220 15% 10% / 0.6) 0%, hsl(220 15% 6% / 0.8) 100%)',
        border: `1px solid hsl(176 100% 43% / ${isOpen ? '0.25' : '0.1'})`,
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 md:p-6 text-left gap-4"
        aria-expanded={isOpen}
      >
        <h3 className="font-heading text-base md:text-lg font-semibold text-foreground/90">{question}</h3>
        <ChevronDown
          className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300"
        style={{
          maxHeight: isOpen ? contentRef.current?.scrollHeight ?? 500 : 0,
          opacity: isOpen ? 1 : 0,
        }}
      >
        <p className="px-5 md:px-6 pb-5 md:pb-6 font-sans text-sm md:text-base text-muted-foreground leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
};

const SeoContentSections = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.seo-section',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-6 max-w-4xl space-y-16 md:space-y-24">
        {/* Content Sections */}
        {sections.map((section, i) => (
          <div key={i} className="seo-section">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
              <span className="text-gradient">{section.title}</span>
            </h2>
            <p className="font-sans text-base md:text-lg text-muted-foreground leading-relaxed">
              {section.content}
            </p>
            {i < sections.length - 1 && (
              <div className="mt-12 md:mt-16 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            )}
          </div>
        ))}

        {/* FAQ Section */}
        <div className="seo-section pt-8">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-10 text-center">
            <span className="text-gradient">Najczęstsze pytania o AI i Sztuczną Inteligencję</span>
          </h2>
          <div className="space-y-4">
            {faqItems.map((item, i) => (
              <FaqItem key={i} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeoContentSections;
