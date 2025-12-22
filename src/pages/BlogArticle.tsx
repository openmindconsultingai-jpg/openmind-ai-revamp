import { useParams, useNavigate } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import BlogArticleComponent from '@/components/BlogArticle';
import Footer from '@/components/Footer';

// Generowanie dat od 1 września 2025 do 22 grudnia 2025 (co ok. 4 dni)
const generatePublishDate = (index: number) => {
  const startDate = new Date('2025-09-01');
  const endDate = new Date('2025-12-22');
  const totalDays = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const dayStep = Math.floor(totalDays / 29);
  const publishDate = new Date(startDate);
  publishDate.setDate(publishDate.getDate() + (index * dayStep));
  return publishDate;
};

const articles = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  titleKey: `blog.article${i + 1}.title`,
  excerptKey: `blog.article${i + 1}.excerpt`,
  contentKey: `blog.article${i + 1}.content`,
  publishDate: generatePublishDate(i),
}));

const BlogArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const articleId = parseInt(id || '1', 10);
  const article = articles.find(a => a.id === articleId);

  if (!article) {
    navigate('/blog');
    return null;
  }

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
