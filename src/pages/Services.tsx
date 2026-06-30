import { useParams } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import Services from '@/components/Services';
import Footer from '@/components/Footer';
import usePageMeta from '@/hooks/usePageMeta';
import useCanonical from '@/hooks/useCanonical';
import { useLanguage } from '@/contexts/LanguageContext';

const SLUG_TO_SERVICE_ID: Record<string, string> = {
  'agencja-kreatywna-ai': 'creative',
  'automatyzacja-ai': 'automation',
  'szkolenia-ai': 'education',
  'tworzenie-stron-www': 'web',
  'konsulting-ai': 'automation',
  'ai-dla-szkol': 'education',
  'creative': 'creative',
  'automation': 'automation',
  'education': 'education',
  'web': 'web',
};

const servicesMeta: Record<string, { title: string; titleEn: string; description: string; descriptionEn: string; keywords: string; keywordsEn: string }> = {
  'agencja-kreatywna-ai': {
    title: 'Agencja Kreatywna AI – Wideo Marketing, Teledyski, Virale | OpenMind AI',
    titleEn: 'AI Creative Agency – Video Marketing, Music Videos, Virals | OpenMind AI',
    description: 'Produkcja wideo AI, wiralowe rolki, TikToki, wirtualni influencerzy, kampanie reklamowe z AI awatarami. Tworzymy treści, które zdobywają miliony wyświetleń.',
    descriptionEn: 'AI video production, viral reels, TikToks, virtual influencers, ad campaigns with AI avatars. We create content that gets millions of views.',
    keywords: 'agencja kreatywna AI, produkcja wideo AI, teledyski AI, virale AI, TikTok AI, wirtualni influencerzy, AI awatar, kampanie reklamowe AI, short form video AI',
    keywordsEn: 'AI creative agency, AI video production, AI music videos, AI virals, TikTok AI, virtual influencers, AI avatar, AI ad campaigns, short form video AI',
  },
  'automatyzacja-ai': {
    title: 'Automatyzacja Procesów Biznesowych – Wdrożenia AI, Aplikacje | OpenMind AI',
    titleEn: 'Business Process Automation – AI Implementation, Applications | OpenMind AI',
    description: 'Automatyzacja workflow, budowa aplikacji AI, integracja Make/n8n, wdrożenia ChatGPT w firmach, analityka danych i raportowanie AI.',
    descriptionEn: 'Workflow automation, AI application development, Make/n8n integration, ChatGPT deployment in businesses, data analytics and AI reporting.',
    keywords: 'automatyzacja procesów AI, wdrożenie AI w firmie, aplikacje AI, Make n8n, automatyzacja workflow, ChatGPT dla firm, analityka AI, raportowanie AI',
    keywordsEn: 'AI process automation, AI implementation, AI applications, Make n8n, workflow automation, ChatGPT for business, AI analytics, AI reporting',
  },
  'szkolenia-ai': {
    title: 'Szkolenia AI – Kursy, Warsztaty, Akademia dla Dzieci | OpenMind AI',
    titleEn: 'AI Training – Courses, Workshops, Academy for Kids | OpenMind AI',
    description: 'Szkolenia AI dla firm i osób prywatnych, kursy prompt engineering, bootcampy, Akademia Młodego Twórcy. Edukacja technologiczna na najwyższym poziomie.',
    descriptionEn: 'AI training for businesses and individuals, prompt engineering courses, bootcamps, Young Creator Academy. Top-level technology education.',
    keywords: 'szkolenia AI, kursy AI, warsztaty AI, prompt engineering, szkolenia dla firm AI, akademia AI dla dzieci, bootcamp AI, edukacja technologiczna',
    keywordsEn: 'AI training, AI courses, AI workshops, prompt engineering, AI corporate training, AI academy for kids, AI bootcamp, technology education',
  },
  'tworzenie-stron-www': {
    title: 'Strony WWW z AI, Chatboty, Branding – Nowoczesne Rozwiązania | OpenMind AI',
    titleEn: 'AI Websites, Chatbots, Branding – Modern Solutions | OpenMind AI',
    description: 'Projektowanie stron WWW zintegrowanych z AI, wdrożenia chatbotów i asystentów głosowych, generatywny branding i identyfikacja wizualna.',
    descriptionEn: 'AI-integrated website design, chatbot and voice assistant deployment, generative branding and visual identity.',
    keywords: 'strony WWW AI, chatbot dla firmy, asystent głosowy AI, branding AI, identyfikacja wizualna AI, SEO AI, strony internetowe AI',
    keywordsEn: 'AI websites, business chatbot, AI voice assistant, AI branding, AI visual identity, AI SEO, AI web design',
  },
  'konsulting-ai': {
    title: 'Konsulting AI – Doradztwo, Audyt i Strategia Sztucznej Inteligencji | OpenMind AI',
    titleEn: 'AI Consulting – Advisory, Audit & AI Strategy | OpenMind AI',
    description: 'Profesjonalny konsulting AI dla firm. Audyt procesów, strategia wdrożenia sztucznej inteligencji, dobór narzędzi AI, optymalizacja kosztów i szkolenie zespołu.',
    descriptionEn: 'Professional AI consulting for businesses. Process audit, AI implementation strategy, AI tool selection, cost optimization and team training.',
    keywords: 'konsulting AI, doradztwo AI, audyt AI, strategia AI, konsulting sztuczna inteligencja, wdrożenie AI firma, optymalizacja procesów AI',
    keywordsEn: 'AI consulting, AI advisory, AI audit, AI strategy, artificial intelligence consulting, AI business implementation, AI process optimization',
  },
  'ai-dla-szkol': {
    title: 'AI dla Szkół – Szkolenia, Warsztaty, Wdrożenia AI w Edukacji | OpenMind AI',
    titleEn: 'AI for Schools – Training, Workshops, AI in Education | OpenMind AI',
    description: 'Kompleksowe wsparcie szkół we wdrożeniu sztucznej inteligencji. Szkolenia dla nauczycieli, warsztaty dla uczniów, narzędzia AI w edukacji.',
    descriptionEn: 'Comprehensive support for schools in implementing AI. Teacher training, student workshops, AI tools in education.',
    keywords: 'AI dla szkół, sztuczna inteligencja w edukacji, szkolenia AI nauczyciele, warsztaty AI uczniowie, AI w szkole, edukacja AI, ChatGPT dla szkół',
    keywordsEn: 'AI for schools, artificial intelligence in education, AI teacher training, AI student workshops, AI in school, AI education, ChatGPT for schools',
  },
};

// Map English slugs to their Polish counterparts for meta
const englishSlugMeta: Record<string, string> = {
  creative: 'agencja-kreatywna-ai',
  automation: 'automatyzacja-ai',
  education: 'szkolenia-ai',
  web: 'tworzenie-stron-www',
};

const defaultMeta = {
  title: 'Usługi AI – Szkolenia, Wdrożenia, Automatyzacja, Agencja Kreatywna | OpenMind AI',
  titleEn: 'AI Services – Training, Implementation, Automation, Creative Agency | OpenMind AI',
  description: 'Konsulting AI, szkolenia sztucznej inteligencji, wdrożenia chatbotów, automatyzacja procesów biznesowych, generatywne media, kampanie z AI awatarami.',
  descriptionEn: 'AI consulting, artificial intelligence training, chatbot deployment, business process automation, generative media, campaigns with AI avatars.',
  keywords: 'usługi AI, szkolenia AI, wdrożenie AI, automatyzacja procesów, chatbot, agencja kreatywna AI, branding AI',
  keywordsEn: 'AI services, AI training, AI implementation, process automation, chatbot, AI creative agency, AI branding',
};

const ServicesPage = () => {
  const { serviceSlug } = useParams<{ serviceSlug?: string }>();
  const { language } = useLanguage();

  const resolvedServiceId = serviceSlug ? SLUG_TO_SERVICE_ID[serviceSlug] : undefined;

  const metaKey = serviceSlug && (servicesMeta[serviceSlug] ? serviceSlug : englishSlugMeta[serviceSlug]);
  const meta = metaKey ? servicesMeta[metaKey] : null;
  
  useCanonical();

  usePageMeta({
    title: language === 'pl'
      ? (meta?.title || defaultMeta.title)
      : (meta?.titleEn || defaultMeta.titleEn),
    description: language === 'pl'
      ? (meta?.description || defaultMeta.description)
      : (meta?.descriptionEn || defaultMeta.descriptionEn),
    keywords: language === 'pl'
      ? (meta?.keywords || defaultMeta.keywords)
      : (meta?.keywordsEn || defaultMeta.keywordsEn),
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
