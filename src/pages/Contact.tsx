import PageLayout from '@/components/PageLayout';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import usePageMeta from '@/hooks/usePageMeta';
import useCanonical from '@/hooks/useCanonical';
import { useLanguage } from '@/contexts/LanguageContext';

const ContactPage = () => {
  const { language } = useLanguage();
  useCanonical();
  usePageMeta({
    title: language === 'pl'
      ? 'Kontakt – Bezpłatna Konsultacja AI | OpenMind AI'
      : 'Contact – Free AI Consultation | OpenMind AI',
    description: language === 'pl'
      ? 'Skontaktuj się z OpenMind AI. Bezpłatna konsultacja dotycząca szkoleń AI, wdrożeń sztucznej inteligencji, automatyzacji procesów i produkcji kreatywnej. Odpowiadamy w ciągu 24 godzin. Działamy w całej Polsce.'
      : 'Contact OpenMind AI. Free consultation on AI training, artificial intelligence implementation, process automation and creative production. We respond within 24 hours. We operate across Poland.',
    keywords: language === 'pl'
      ? 'kontakt OpenMind AI, bezpłatna konsultacja AI, szkolenia AI kontakt, wdrożenia AI kontakt, oferta AI, zapytanie ofertowe AI, konsultacja sztuczna inteligencja'
      : 'contact OpenMind AI, free AI consultation, AI training contact, AI implementation contact, AI offer, AI quote request, artificial intelligence consultation',
    path: '/contact',
  });

  return (
    <PageLayout>
      <Contact />
      <Footer />
    </PageLayout>
  );
};

export default ContactPage;
