import PageLayout from '@/components/PageLayout';
import Services from '@/components/Services';
import Footer from '@/components/Footer';
import usePageMeta from '@/hooks/usePageMeta';

const ServicesPage = () => {
  usePageMeta({
    title: 'Usługi AI – Szkolenia, Wdrożenia, Automatyzacja, Agencja Kreatywna | OpenMind AI',
    description: 'Konsulting AI, szkolenia sztucznej inteligencji, wdrożenia chatbotów, automatyzacja procesów biznesowych, generatywne media (wideo, grafika, reklamy AI), kampanie social media z AI awatarami, doradztwo strategiczne RODO. Sprawdź pełną ofertę.',
    keywords: 'usługi AI, szkolenia AI dla firm, wdrożenie sztucznej inteligencji, automatyzacja procesów, chatbot dla firmy, generatywne media AI, AI awatar, kampanie reklamowe AI, produkcja wideo AI, tworzenie grafik AI, konsulting AI, doradztwo strategiczne, RODO AI, agencja kreatywna AI',
    path: '/services',
  });

  return (
    <PageLayout>
      <Services />
      <Footer />
    </PageLayout>
  );
};

export default ServicesPage;
