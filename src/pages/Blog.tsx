import PageLayout from '@/components/PageLayout';
import BlogContent from '@/components/Blog';
import Footer from '@/components/Footer';
import usePageMeta from '@/hooks/usePageMeta';

const Blog = () => {
  usePageMeta({
    title: 'Baza Wiedzy o AI – Artykuły, Poradniki, Aktualności | OpenMind AI',
    description: 'Praktyczna baza wiedzy o sztucznej inteligencji: artykuły o machine learning, automatyzacji, ChatGPT, generatywnej AI, wdrożeniach dla firm, trendach technologicznych. Bezpłatne poradniki i case study od ekspertów OpenMind AI.',
    keywords: 'blog AI, artykuły sztuczna inteligencja, baza wiedzy AI, poradniki AI, machine learning, ChatGPT, automatyzacja, generatywna AI, trendy AI, case study AI, uczenie maszynowe, NLP, deep learning',
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
