import { useParams } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import Services from '@/components/Services';
import Footer from '@/components/Footer';
import usePageMeta from '@/hooks/usePageMeta';

const servicesMeta: Record<string, { title: string; description: string; keywords: string }> = {
  creative: {
    title: 'Agencja Kreatywna AI – Wideo Marketing, Teledyski, Virale | OpenMind AI',
    description: 'Produkcja wideo AI, wiralowe rolki, TikToki, wirtualni influencerzy, kampanie reklamowe z AI awatarami. Tworzymy treści, które zdobywają miliony wyświetleń.',
    keywords: 'agencja kreatywna AI, produkcja wideo AI, teledyski AI, virale AI, TikTok AI, wirtualni influencerzy, AI awatar, kampanie reklamowe AI, short form video AI',
  },
  automation: {
    title: 'Automatyzacja Procesów Biznesowych – Wdrożenia AI, Aplikacje | OpenMind AI',
    description: 'Automatyzacja workflow, budowa aplikacji AI, integracja Make/n8n, wdrożenia ChatGPT w firmach, analityka danych i raportowanie AI.',
    keywords: 'automatyzacja procesów AI, wdrożenie AI w firmie, aplikacje AI, Make n8n, automatyzacja workflow, ChatGPT dla firm, analityka AI, raportowanie AI',
  },
  education: {
    title: 'Szkolenia AI – Kursy, Warsztaty, Akademia dla Dzieci | OpenMind AI',
    description: 'Szkolenia AI dla firm i osób prywatnych, kursy prompt engineering, bootcampy, Akademia Młodego Twórcy. Edukacja technologiczna na najwyższym poziomie.',
    keywords: 'szkolenia AI, kursy AI, warsztaty AI, prompt engineering, szkolenia dla firm AI, akademia AI dla dzieci, bootcamp AI, edukacja technologiczna',
  },
  web: {
    title: 'Strony WWW z AI, Chatboty, Branding – Nowoczesne Rozwiązania | OpenMind AI',
    description: 'Projektowanie stron WWW zintegrowanych z AI, wdrożenia chatbotów i asystentów głosowych, generatywny branding i identyfikacja wizualna.',
    keywords: 'strony WWW AI, chatbot dla firmy, asystent głosowy AI, branding AI, identyfikacja wizualna AI, SEO AI, strony internetowe AI',
  },
};

const defaultMeta = {
  title: 'Usługi AI – Szkolenia, Wdrożenia, Automatyzacja, Agencja Kreatywna | OpenMind AI',
  description: 'Konsulting AI, szkolenia sztucznej inteligencji, wdrożenia chatbotów, automatyzacja procesów biznesowych, generatywne media, kampanie z AI awatarami.',
  keywords: 'usługi AI, szkolenia AI, wdrożenie AI, automatyzacja procesów, chatbot, agencja kreatywna AI, branding AI',
};

const ServicesPage = () => {
  const { serviceSlug } = useParams<{ serviceSlug?: string }>();
  const meta = (serviceSlug && servicesMeta[serviceSlug]) || defaultMeta;

  usePageMeta({
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    path: serviceSlug ? `/services/${serviceSlug}` : '/services',
  });

  return (
    <PageLayout>
      <Services serviceSlug={serviceSlug} />
      <Footer />
    </PageLayout>
  );
};

export default ServicesPage;
