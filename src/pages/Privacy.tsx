import PageLayout from '@/components/PageLayout';
import Privacy from '@/components/Privacy';
import Footer from '@/components/Footer';
import usePageMeta from '@/hooks/usePageMeta';
import useCanonical from '@/hooks/useCanonical';
import { useLanguage } from '@/contexts/LanguageContext';

const PrivacyPage = () => {
  const { language } = useLanguage();
  useCanonical();
  usePageMeta({
    title: language === 'pl'
      ? 'Polityka Prywatności | OpenMind AI Consulting'
      : 'Privacy Policy | OpenMind AI Consulting',
    description: language === 'pl'
      ? 'Polityka prywatności OpenMind AI Consulting. Informacje o przetwarzaniu danych osobowych, prawach użytkowników zgodnie z RODO oraz bezpieczeństwie danych.'
      : 'Privacy policy of OpenMind AI Consulting. Information about personal data processing, user rights under GDPR, and data security.',
    keywords: language === 'pl'
      ? 'polityka prywatności, RODO, ochrona danych osobowych, OpenMind AI, przetwarzanie danych'
      : 'privacy policy, GDPR, personal data protection, OpenMind AI, data processing',
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
