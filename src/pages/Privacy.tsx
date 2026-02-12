import PageLayout from '@/components/PageLayout';
import Privacy from '@/components/Privacy';
import Footer from '@/components/Footer';
import usePageMeta from '@/hooks/usePageMeta';

const PrivacyPage = () => {
  usePageMeta({
    title: 'Polityka Prywatności | OpenMind AI Consulting',
    description: 'Polityka prywatności OpenMind AI Consulting. Informacje o przetwarzaniu danych osobowych, prawach użytkowników zgodnie z RODO oraz bezpieczeństwie danych.',
    keywords: 'polityka prywatności, RODO, ochrona danych osobowych, OpenMind AI, przetwarzanie danych',
    path: '/privacy',
  });

  return (
    <PageLayout>
      <Privacy />
      <Footer />
    </PageLayout>
  );
};

export default PrivacyPage;
