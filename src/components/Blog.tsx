import { memo, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import BlogArticleCard from './BlogArticleCard';
import BlogSearch from './BlogSearch';
import { useBlogSearch } from '@/hooks/useBlogSearch';

const Blog = memo(() => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const {
    searchQuery,
    selectedCategory,
    categories,
    filteredArticles,
    handleSearchChange,
    handleCategoryChange,
  } = useBlogSearch();

  const handleArticleClick = useCallback((articleId: number) => {
    navigate(`/blog/${articleId}`);
  }, [navigate]);

  return (
    <section className="pt-20 md:pt-24 pb-20 px-4 relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.07]"
          style={{
            background: 'radial-gradient(circle, hsl(176 100% 43% / 0.4) 0%, transparent 70%)',
            left: '-10%',
            top: '20%',
          }}
        />
        <div 
          className="absolute w-[500px] h-[500px] rounded-full opacity-[0.07]"
          style={{
            background: 'radial-gradient(circle, hsl(190 100% 50% / 0.4) 0%, transparent 70%)',
            right: '-5%',
            bottom: '10%',
          }}
        />
      </div>

      <div className="container mx-auto max-w-6xl relative">
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-gradient">{t('nav.blog')}</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('blog.subtitle')}
          </p>
        </div>

        <BlogSearch
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          categories={categories}
          resultCount={filteredArticles.length}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <div 
              key={article.id} 
              onClick={() => handleArticleClick(article.id)} 
              className="cursor-pointer transition-transform duration-200 hover:-translate-y-1"
            >
              <BlogArticleCard
                titleKey={article.titleKey}
                excerptKey={article.excerptKey}
                articleId={article.id}
                publishDate={article.publishDate}
                category={article.category}
              />
            </div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">
              {t('language') === 'pl' 
                ? 'Nie znaleziono artykułów spełniających kryteria wyszukiwania.'
                : 'No articles found matching your search criteria.'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
});

Blog.displayName = 'Blog';

export default Blog;
