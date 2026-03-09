import { useParams } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import Services from '@/components/Services';
import Footer from '@/components/Footer';
import usePageMeta from '@/hooks/usePageMeta';
import useCanonical from '@/hooks/useCanonical';

/**
 * Maps Polish SEO-friendly sitemap slugs → internal English SERVICE_IDS.
 * This ensures sitemap URLs like /services/agencja-kreatywna-ai resolve
 * to the correct tab instead of falling back to 'creative'.
 */
const SLUG_TO_SERVICE_ID: Record<string, string> = {
  // Polish SEO slugs (used in sitemap & Google)
  'agencja-kreatywna-ai': 'creative',
  'automatyzacja-ai': 'automation',
  'szkolenia-ai': 'education',
  'tworzenie-stron-www': 'web',
  'konsulting-ai': 'automation',   // consulting → automation tab (closest match)
  'ai-dla-szkol': 'education',     // AI for schools → education tab
  // English slugs (direct match, kept for backwards compatibility)
  'creative': 'creative',
  'automation': 'automation',
  'education': 'education',
  'web': 'web',
};

const servicesMeta: Record<string, { title: string; description: string; keywords: string }> = {
  'agencja-kreatywna-ai': {
    title: 'Agencja Kreatywna AI – Wideo Marketing, Teledyski, Virale | OpenMind AI',
    description: 'Produkcja wideo AI, wiralowe rolki, TikToki, wirtualni influencerzy, kampanie reklamowe z AI awatarami. Tworzymy treści, które zdobywają miliony wyświetleń.',
    keywords: 'agencja kreatywna AI, produkcja wideo AI, teledyski AI, virale AI, TikTok AI, wirtualni influencerzy, AI awatar, kampanie reklamowe AI, short form video AI',
  },
  'automatyzacja-ai': {
    title: 'Automatyzacja Procesów Biznesowych – Wdrożenia AI, Aplikacje | OpenMind AI',
    description: 'Automatyzacja workflow, budowa aplikacji AI, integracja Make/n8n, wdrożenia ChatGPT w firmach, analityka danych i raportowanie AI.',
    keywords: 'automatyzacja procesów AI, wdrożenie AI w firmie, aplikacje AI, Make n8n, automatyzacja workflow, ChatGPT dla firm, analityka AI, raportowanie AI',
  },
  'szkolenia-ai': {
    title: 'Szkolenia AI – Kursy, Warsztaty, Akademia dla Dzieci | OpenMind AI',
    description: 'Szkolenia AI dla firm i osób prywatnych, kursy prompt engineering, bootcampy, Akademia Młodego Twórcy. Edukacja technologiczna na najwyższym poziomie.',
    keywords: 'szkolenia AI, kursy AI, warsztaty AI, prompt engineering, szkolenia dla firm AI, akademia AI dla dzieci, bootcamp AI, edukacja technologiczna',
  },
  'tworzenie-stron-www': {
    title: 'Strony WWW z AI, Chatboty, Branding – Nowoczesne Rozwiązania | OpenMind AI',
    description: 'Projektowanie stron WWW zintegrowanych z AI, wdrożenia chatbotów i asystentów głosowych, generatywny branding i identyfikacja wizualna.',
    keywords: 'strony WWW AI, chatbot dla firmy, asystent głosowy AI, branding AI, identyfikacja wizualna AI, SEO AI, strony internetowe AI',
  },
  'konsulting-ai': {
    title: 'Konsulting AI – Doradztwo, Audyt i Strategia Sztucznej Inteligencji | OpenMind AI',
    description: 'Profesjonalny konsulting AI dla firm. Audyt procesów, strategia wdrożenia sztucznej inteligencji, dobór narzędzi AI, optymalizacja kosztów i szkolenie zespołu.',
    keywords: 'konsulting AI, doradztwo AI, audyt AI, strategia AI, konsulting sztuczna inteligencja, wdrożenie AI firma, optymalizacja procesów AI',
  },
  'ai-dla-szkol': {
    title: 'AI dla Szkół – Szkolenia, Warsztaty, Wdrożenia SI w Edukacji | OpenMind AI',
    description: 'Kompleksowe wsparcie szkół we wdrożeniu sztucznej inteligencji. Szkolenia dla nauczycieli, warsztaty dla uczniów, narzędzia AI w edukacji.',
    keywords: 'AI dla szkół, sztuczna inteligencja w edukacji, szkolenia AI nauczyciele, warsztaty AI uczniowie, SI w szkole, edukacja AI, ChatGPT dla szkół',
  },
  // Keep English slugs for backwards compat
  creative: {
    title: 'Agencja Kreatywna AI – Wideo Marketing, Teledyski, Virale | OpenMind AI',
    description: 'Produkcja wideo AI, wiralowe rolki, TikToki, wirtualni influencerzy, kampanie reklamowe z AI awatarami. Tworzymy treści, które zdobywają miliony wyświetleń.',
    keywords: 'agencja kreatywna AI, produkcja wideo AI, teledyski AI, virale AI, TikTok AI, wirtualni influencerzy, AI awatar, kampanie reklamowe AI',
  },
  automation: {
    title: 'Automatyzacja Procesów Biznesowych – Wdrożenia AI, Aplikacje | OpenMind AI',
    description: 'Automatyzacja workflow, budowa aplikacji AI, integracja Make/n8n, wdrożenia ChatGPT w firmach, analityka danych i raportowanie AI.',
    keywords: 'automatyzacja procesów AI, wdrożenie AI w firmie, aplikacje AI, Make n8n, automatyzacja workflow, ChatGPT dla firm',
  },
  education: {
    title: 'Szkolenia AI – Kursy, Warsztaty, Akademia dla Dzieci | OpenMind AI',
    description: 'Szkolenia AI dla firm i osób prywatnych, kursy prompt engineering, bootcampy, Akademia Młodego Twórcy. Edukacja technologiczna na najwyższym poziomie.',
    keywords: 'szkolenia AI, kursy AI, warsztaty AI, prompt engineering, szkolenia dla firm AI, akademia AI dla dzieci',
  },
  web: {
    title: 'Strony WWW z AI, Chatboty, Branding – Nowoczesne Rozwiązania | OpenMind AI',
    description: 'Projektowanie stron WWW zintegrowanych z AI, wdrożenia chatbotów i asystentów głosowych, generatywny branding i identyfikacja wizualna.',
    keywords: 'strony WWW AI, chatbot dla firmy, asystent głosowy AI, branding AI, identyfikacja wizualna AI',
  },
};

const defaultMeta = {
  title: 'Usługi AI – Szkolenia, Wdrożenia, Automatyzacja, Agencja Kreatywna | OpenMind AI',
  description: 'Konsulting AI, szkolenia sztucznej inteligencji, wdrożenia chatbotów, automatyzacja procesów biznesowych, generatywne media, kampanie z AI awatarami.',
  keywords: 'usługi AI, szkolenia AI, wdrożenie AI, automatyzacja procesów, chatbot, agencja kreatywna AI, branding AI',
};

const ServicesPage = () => {
  const { serviceSlug } = useParams<{ serviceSlug?: string }>();

  // Resolve Polish SEO slug → internal English service ID for the component
  const resolvedServiceId = serviceSlug ? SLUG_TO_SERVICE_ID[serviceSlug] : undefined;

  const meta = (serviceSlug && servicesMeta[serviceSlug]) || defaultMeta;
  useCanonical();

  usePageMeta({
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    path: serviceSlug ? `/services/${serviceSlug}` : '/services',
  });

  return (
    <PageLayout>
      <Services serviceSlug={resolvedServiceId || serviceSlug} />
      <Footer />
    </PageLayout>
  );
};

export default ServicesPage;
