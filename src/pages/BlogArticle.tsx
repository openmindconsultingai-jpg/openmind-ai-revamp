import { useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import BlogArticleComponent from '@/components/BlogArticle';
import Footer from '@/components/Footer';
import usePageMeta from '@/hooks/usePageMeta';
import useCanonical from '@/hooks/useCanonical';
import { useLanguage } from '@/contexts/LanguageContext';
import { digestArticles } from '@/data/blogArticlesDigest';

const generatePublishDate = (articleId: number) => {
  // Digest articles (61-110)
  const digestArticle = digestArticles.find(a => a.id === articleId);
  if (digestArticle) {
    return new Date(digestArticle.date);
  }

  if (articleId >= 31 && articleId <= 60) {
    const startDate = new Date('2025-11-27');
    const totalDays = Math.floor((new Date('2025-12-22').getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const dayStep = totalDays / 29;
    const index = articleId - 31;
    const publishDate = new Date(startDate);
    publishDate.setDate(publishDate.getDate() + Math.floor(index * dayStep));
    return publishDate;
  } else {
    const startDate = new Date('2025-09-01');
    const totalDays = Math.floor((new Date('2025-11-26').getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const dayStep = totalDays / 29;
    const index = articleId - 1;
    const publishDate = new Date(startDate);
    publishDate.setDate(publishDate.getDate() + Math.floor(index * dayStep));
    return publishDate;
  }
};

const articles = [
  ...Array.from({ length: 60 }, (_, i) => ({
    id: i + 1,
    titleKey: `blog.article${i + 1}.title`,
    excerptKey: `blog.article${i + 1}.excerpt`,
    contentKey: `blog.article${i + 1}.content`,
    publishDate: generatePublishDate(i + 1),
  })),
  ...digestArticles.map((article) => ({
    id: article.id,
    titleKey: `blog.article${article.id}.title`,
    excerptKey: `blog.article${article.id}.excerpt`,
    contentKey: `blog.article${article.id}.content`,
    publishDate: new Date(article.date),
  })),
];

const BlogArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  useCanonical();

  const articleId = parseInt(id || '1', 10);
  const article = articles.find((a) => a.id === articleId);

  const articleTitle = article ? t(article.titleKey) : '';
  const articleExcerpt = article ? t(article.excerptKey) : '';

  const jsonLd = useMemo(() => article ? ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: articleTitle,
    description: articleExcerpt,
    author: { '@type': 'Person', name: 'Łukasz Czarnecki' },
    publisher: {
      '@type': 'Organization',
      name: 'OpenMind AI Consulting',
      url: 'https://www.openmindai.pl',
    },
    datePublished: article.publishDate.toISOString(),
    mainEntityOfPage: `https://www.openmindai.pl/blog/${article.id}`,
  }) : undefined, [article, articleTitle, articleExcerpt]);

  usePageMeta({
    title: article ? `${articleTitle} | Baza Wiedzy AI – OpenMind AI` : 'Artykuł | OpenMind AI',
    description: article ? articleExcerpt.slice(0, 155) + '…' : '',
    keywords: 'artykuł AI, sztuczna inteligencja, machine learning, automatyzacja, ChatGPT, OpenMind AI, baza wiedzy',
    path: `/blog/${id}`,
    ogType: 'article',
    jsonLd,
  });

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
