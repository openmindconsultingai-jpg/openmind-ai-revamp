import { useLanguage } from '@/contexts/LanguageContext';

const Blog = () => {
  const { t } = useLanguage();

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

        <div className="text-center py-20">
          <p className="text-xl text-muted-foreground">
            {t('blog.coming-soon')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Blog;
