import PageLayout from '@/components/PageLayout';
import Footer from '@/components/Footer';
import NewsCard from '@/components/NewsCard';
import usePageMeta from '@/hooks/usePageMeta';
import useCanonical from '@/hooks/useCanonical';
import { useLanguage } from '@/contexts/LanguageContext';
import { localizeNews, useNewsList } from '@/hooks/useNews';

const News = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';
  useCanonical();
  usePageMeta({
    title: isEn
      ? 'OpenMind AI News – Company Updates | OpenMind AI'
      : 'Aktualności OpenMind AI – Nowości z firmy | OpenMind AI',
    description: isEn
      ? 'OpenMind AI news: new projects, implementations, trainings, events and company announcements.'
      : 'Aktualności OpenMind AI: nowe projekty, wdrożenia, szkolenia, wydarzenia i ogłoszenia z życia firmy.',
    path: '/aktualnosci',
  });

  const { data, isLoading, isError } = useNewsList();
  const items = (data ?? []).map((row) => localizeNews(row, language));

  return (
    <PageLayout>
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 pt-32 pb-20">
        <header className="mb-10 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-gradient">
            {isEn ? 'News' : 'Aktualności'}
          </h1>
          <p className="mt-4 text-muted-foreground">
            {isEn ? 'Updates from OpenMind AI.' : 'Nowości z życia OpenMind AI.'}
          </p>
        </header>

        {isLoading && (
          <div className="flex justify-center py-16" role="status" aria-label={isEn ? 'Loading' : 'Ładowanie'}>
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        )}

        {!isLoading && (isError || items.length === 0) && (
          <p className="py-16 text-center text-muted-foreground">
            {isError
              ? isEn ? 'Could not load news. Please try again later.' : 'Nie udało się wczytać aktualności. Spróbuj ponownie później.'
              : isEn ? 'No news yet — check back soon.' : 'Wkrótce pojawią się tu pierwsze aktualności.'}
          </p>
        )}

        {items.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {items.map((item) => (
              <NewsCard key={item.id} item={item} language={language} headingLevel="h2" />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </PageLayout>
  );
};

export default News;
