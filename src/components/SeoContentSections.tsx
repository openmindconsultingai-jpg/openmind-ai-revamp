import DecodeText from '@/components/fx/DecodeText';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDown } from 'lucide-react';

const FaqItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="fx-card fx-reveal overflow-hidden"
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
        className="overflow-hidden"
        hidden={!isOpen}
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

  return (
    <section className="fx-trace fx-prose relative py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-6 max-w-4xl space-y-16 md:space-y-24">
        {/* Content Sections */}
        {sections.map((section, i) => (
          <div key={i} className="seo-section">
            <h2 className="font-heading h-section-long mb-6">
              <span className="text-gradient"><DecodeText text={section.title} /></span>
            </h2>
            <p className="fx-reveal font-sans text-base md:text-lg text-muted-foreground leading-relaxed">
              {section.content}
            </p>
            {i < sections.length - 1 && (
              <div className="mt-12 md:mt-16 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            )}
          </div>
        ))}

        {/* FAQ Section */}
        <div className="seo-section pt-8">
          <h2 className="font-heading h-section mb-10 text-center">
            <span className="text-gradient"><DecodeText text={t('seo.faq.title')} accentLast /></span>
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
