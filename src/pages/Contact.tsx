import PageLayout from '@/components/PageLayout';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import usePageMeta from '@/hooks/usePageMeta';
import useCanonical from '@/hooks/useCanonical';

const ContactPage = () => {
  useCanonical();
  usePageMeta({
    title: 'Kontakt – Bezpłatna Konsultacja AI | OpenMind AI',
    description: 'Skontaktuj się z OpenMind AI. Bezpłatna konsultacja dotycząca szkoleń AI, wdrożeń sztucznej inteligencji, automatyzacji procesów i produkcji kreatywnej. Odpowiadamy w ciągu 24 godzin. Działamy w całej Polsce.',
    keywords: 'kontakt OpenMind AI, bezpłatna konsultacja AI, szkolenia AI kontakt, wdrożenia AI kontakt, oferta AI, zapytanie ofertowe AI, konsultacja sztuczna inteligencja',
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
