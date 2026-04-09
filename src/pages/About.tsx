import PageLayout from '@/components/PageLayout';
import About from '@/components/About';
import Footer from '@/components/Footer';
import usePageMeta from '@/hooks/usePageMeta';
import useCanonical from '@/hooks/useCanonical';
import { useLanguage } from '@/contexts/LanguageContext';

const AboutPage = () => {
  const { language } = useLanguage();
  useCanonical();
  usePageMeta({
    title: language === 'pl'
      ? 'O nas – OpenMind AI Consulting | Eksperci AI w Polsce'
      : 'About Us – OpenMind AI Consulting | AI Experts in Poland',
    description: language === 'pl'
      ? 'Poznaj OpenMind AI Consulting – polski hub technologiczny łączący inżynierię AI z kreatywnością. Szkolenia, wdrożenia, generatywne media, automatyzacja. Zespół ekspertów AI z doświadczeniem w e-commerce, medycynie, prawie i nieruchomościach.'
      : 'Meet OpenMind AI Consulting – a Polish tech hub combining AI engineering with creativity. Training, implementation, generative media, automation. A team of AI experts with experience in e-commerce, medicine, law and real estate.',
    keywords: language === 'pl'
      ? 'OpenMind AI, o nas, zespół AI, eksperci sztuczna inteligencja, Łukasz Czarnecki, konsulting AI Polska, hub technologiczny, agencja AI, transformacja cyfrowa'
      : 'OpenMind AI, about us, AI team, artificial intelligence experts, Łukasz Czarnecki, AI consulting Poland, tech hub, AI agency, digital transformation',
    path: '/about',
  });

  return (
    <PageLayout>
      <About />
      <Footer />
    </PageLayout>
  );
};

export default AboutPage;
