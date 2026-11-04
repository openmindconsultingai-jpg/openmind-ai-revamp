import { Link } from 'react-router-dom';
import { formatNewsDate, type LocalizedNews } from '@/hooks/useNews';
import { noWidows } from '@/lib/typography';

interface NewsCardProps {
  item: LocalizedNews;
  language: string;
  headingLevel?: 'h2' | 'h3';
}

const NewsCard = ({ item, language, headingLevel = 'h3' }: NewsCardProps) => {
  const Heading = headingLevel;
  const href = `/aktualnosci/${item.slug}`;
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/30 bg-card/20 backdrop-blur-sm transition-colors duration-300 hover:border-primary/50">
      {item.imageUrl && (
        <Link to={href} tabIndex={-1} aria-hidden="true" className="block aspect-[16/9] overflow-hidden">
          <img
            src={item.imageUrl}
            alt={item.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
      )}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-[0.15em]">
          {item.publishedAt && (
            <time dateTime={item.publishedAt} className="text-muted-foreground">
              {formatNewsDate(item.publishedAt, language)}
            </time>
          )}
          {item.category && <span className="text-primary">{item.category}</span>}
        </div>
        <Heading className="font-heading text-xl font-bold leading-tight text-foreground">
          <Link to={href} className="transition-colors hover:text-primary focus-visible:text-primary">
            {item.title}
          </Link>
        </Heading>
        {item.excerpt && (
          <p className="mt-3 flex-1 text-sm text-muted-foreground text-justify hyphens-auto" lang={language}>
            {noWidows(item.excerpt)}
          </p>
        )}
        <Link
          to={href}
          className="mt-5 text-xs font-semibold uppercase tracking-[0.15em] text-primary hover:underline"
          aria-label={`${language === 'en' ? 'Read more' : 'Czytaj więcej'}: ${item.title}`}
        >
          {language === 'en' ? 'Read more →' : 'Czytaj więcej →'}
        </Link>
      </div>
    </article>
  );
};

export default NewsCard;
