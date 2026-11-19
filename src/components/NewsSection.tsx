import DecodeText from '@/components/fx/DecodeText';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { localizeNews, useNewsList } from '@/hooks/useNews';
import NewsCard from '@/components/NewsCard';

const NewsSection = () => {
  const { language } = useLanguage();
  const { data } = useNewsList(3);

  // No published news → render nothing at all.
  if (!data || data.length === 0) return null;

  const items = data.map((row) => localizeNews(row, language));
  const isEn = language === 'en';

  return (
    <section aria-labelledby="home-news-heading" className="fx-trace mt-10 pt-12 md:pt-16 w-full max-w-5xl mx-auto px-4 sm:px-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
        <h2 id="home-news-heading" className="font-heading h-section text-gradient">
          <DecodeText text={isEn ? 'News' : 'Aktualności'} accentLast />
        </h2>
        <Link
          to="/aktualnosci"
          className="fx-text-link shrink-0 self-end text-xs font-semibold uppercase tracking-[0.15em] text-primary"
        >
          {isEn ? 'See all →' : 'Zobacz wszystkie →'}
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {items.map((item) => (
          <NewsCard key={item.id} item={item} language={language} />
        ))}
      </div>
    </section>
  );
};

export default NewsSection;
