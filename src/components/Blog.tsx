import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import BlogArticleCard from './BlogArticleCard';
import BlogArticle from './BlogArticle';

const Blog = () => {
  const { t } = useLanguage();
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);

  const articles = [
    {
      id: 1,
      titleKey: 'blog.article1.title',
      dateKey: 'blog.article1.date',
      excerptKey: 'blog.article1.excerpt',
      contentKey: 'blog.article1.content',
    },
    {
      id: 2,
      titleKey: 'blog.article2.title',
      dateKey: 'blog.article2.date',
      excerptKey: 'blog.article2.excerpt',
      contentKey: 'blog.article2.content',
    },
    {
      id: 3,
      titleKey: 'blog.article3.title',
      dateKey: 'blog.article3.date',
      excerptKey: 'blog.article3.excerpt',
      contentKey: 'blog.article3.content',
    },
  ];

  if (selectedArticle !== null) {
    const article = articles.find(a => a.id === selectedArticle);
    if (article) {
      return (
        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <BlogArticle
              titleKey={article.titleKey}
              dateKey={article.dateKey}
              contentKey={article.contentKey}
              articleId={article.id}
              onBack={() => setSelectedArticle(null)}
            />
          </div>
        </section>
      );
    }
  }

  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            {t('nav.blog')}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('blog.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div key={article.id} onClick={() => setSelectedArticle(article.id)} className="cursor-pointer">
              <BlogArticleCard
                titleKey={article.titleKey}
                dateKey={article.dateKey}
                excerptKey={article.excerptKey}
                articleId={article.id}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
