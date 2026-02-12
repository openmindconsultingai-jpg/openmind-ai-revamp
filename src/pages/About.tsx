import PageLayout from '@/components/PageLayout';
import About from '@/components/About';
import Footer from '@/components/Footer';
import usePageMeta from '@/hooks/usePageMeta';

const AboutPage = () => {
  usePageMeta({
    title: 'O nas – OpenMind AI Consulting | Eksperci AI w Polsce',
    description: 'Poznaj OpenMind AI Consulting – polski hub technologiczny łączący inżynierię AI z kreatywnością. Szkolenia, wdrożenia, generatywne media, automatyzacja. Zespół ekspertów AI z doświadczeniem w e-commerce, medycynie, prawie i nieruchomościach.',
    keywords: 'OpenMind AI, o nas, zespół AI, eksperci sztuczna inteligencja, Łukasz Czarnecki, konsulting AI Polska, hub technologiczny, agencja AI, transformacja cyfrowa',
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
