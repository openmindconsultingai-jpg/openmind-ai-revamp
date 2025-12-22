import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import BlogArticleComponent from '@/components/BlogArticle';
import Footer from '@/components/Footer';

// Generowanie dat: artykuły 31-60 (z drugiej bazy) = 27.11-22.12, artykuły 1-30 (z pierwszej bazy) = 1.09-26.11
const generatePublishDate = (articleId: number) => {
  if (articleId >= 31 && articleId <= 60) {
    // Artykuły 31-60: daty od 27 listopada do 22 grudnia 2025 (najnowsze)
    const startDate = new Date('2025-11-27');
    const endDate = new Date('2025-12-22');
    const totalDays = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const dayStep = totalDays / 29;
    const index = articleId - 31;
    const publishDate = new Date(startDate);
    publishDate.setDate(publishDate.getDate() + Math.floor(index * dayStep));
    return publishDate;
  } else {
    // Artykuły 1-30: daty od 1 września do 26 listopada 2025 (starsze)
    const startDate = new Date('2025-09-01');
    const endDate = new Date('2025-11-26');
    const totalDays = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const dayStep = totalDays / 29;
    const index = articleId - 1;
    const publishDate = new Date(startDate);
    publishDate.setDate(publishDate.getDate() + Math.floor(index * dayStep));
    return publishDate;
  }
};

const articles = Array.from({ length: 60 }, (_, i) => ({
  id: i + 1,
  titleKey: `blog.article${i + 1}.title`,
  excerptKey: `blog.article${i + 1}.excerpt`,
  contentKey: `blog.article${i + 1}.content`,
  publishDate: generatePublishDate(i + 1),
}));

const BlogArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const articleId = parseInt(id || '1', 10);
  const article = articles.find((a) => a.id === articleId);

  useEffect(() => {
    if (!article) navigate('/blog');
  }, [article, navigate]);

  if (!article) return null;

  return (
    <PageLayout>
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <BlogArticleComponent
            titleKey={article.titleKey}
            contentKey={article.contentKey}
            articleId={article.id}
            onBack={() => navigate('/blog')}
            publishDate={article.publishDate}
          />
        </div>
      </section>
      <Footer />
    </PageLayout>
  );
};

export default BlogArticlePage;
