import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

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
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const sections = [
    { title: t('seo.section1.title'), content: t('seo.section1.content') },
    { title: t('seo.section2.title'), content: t('seo.section2.content') },
    { title: t('seo.section3.title'), content: t('seo.section3.content') },
    { title: t('seo.section4.title'), content: t('seo.section4.content') },
    { title: t('seo.section5.title'), content: t('seo.section5.content') },
  ];

  const faqItems = [
    { question: t('seo.faq1.question'), answer: t('seo.faq1.answer') },
    { question: t('seo.faq2.question'), answer: t('seo.faq2.answer') },
    { question: t('seo.faq3.question'), answer: t('seo.faq3.answer') },
    { question: t('seo.faq4.question'), answer: t('seo.faq4.answer') },
    { question: t('seo.faq5.question'), answer: t('seo.faq5.answer') },
  ];

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
            <span className="text-gradient">{t('seo.faq.title')}</span>
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
