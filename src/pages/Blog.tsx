import PageLayout from '@/components/PageLayout';
import BlogContent from '@/components/Blog';
import Footer from '@/components/Footer';
import usePageMeta from '@/hooks/usePageMeta';
import useCanonical from '@/hooks/useCanonical';
import { useLanguage } from '@/contexts/LanguageContext';

const Blog = () => {
  const { language } = useLanguage();
  useCanonical();
  usePageMeta({
    title: language === 'pl'
      ? 'Baza Wiedzy o AI – Artykuły, Poradniki, Aktualności | OpenMind AI'
      : 'AI Knowledge Base – Articles, Guides, News | OpenMind AI',
    description: language === 'pl'
      ? 'Praktyczna baza wiedzy o sztucznej inteligencji: artykuły o machine learning, automatyzacji, ChatGPT, generatywnej AI, wdrożeniach dla firm, trendach technologicznych. Bezpłatne poradniki i case study od ekspertów OpenMind AI.'
      : 'Practical AI knowledge base: articles on machine learning, automation, ChatGPT, generative AI, business implementation, technology trends. Free guides and case studies from OpenMind AI experts.',
    keywords: language === 'pl'
      ? 'blog AI, artykuły sztuczna inteligencja, baza wiedzy AI, poradniki AI, machine learning, ChatGPT, automatyzacja, generatywna AI, trendy AI, case study AI, uczenie maszynowe, NLP, deep learning'
      : 'AI blog, artificial intelligence articles, AI knowledge base, AI guides, machine learning, ChatGPT, automation, generative AI, AI trends, AI case study, NLP, deep learning',
    path: '/blog',
  });

  return (
    <PageLayout>
      <BlogContent />
      <Footer />
    </PageLayout>
  );
};

export default Blog;
