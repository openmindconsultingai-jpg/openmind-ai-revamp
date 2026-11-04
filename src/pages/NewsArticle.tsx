import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import PageLayout from '@/components/PageLayout';
import Footer from '@/components/Footer';
import usePageMeta from '@/hooks/usePageMeta';
import useCanonical from '@/hooks/useCanonical';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatNewsDate, localizeNews, useNewsItem } from '@/hooks/useNews';

const NewsArticle = () => {
  const { slug: rawSlug } = useParams<{ slug: string }>();
  const slug = rawSlug?.replace(/\.html$/, '');
  const { language } = useLanguage();
  const isEn = language === 'en';
  useCanonical();

  const { data, isLoading, isError } = useNewsItem(slug);
  const item = data ? localizeNews(data, language) : null;

  const jsonLd = useMemo(
    () =>
      item
        ? {
            '@context': 'https://schema.org',
            '@type': 'NewsArticle',
            headline: item.title,
            description: item.excerpt,
            datePublished: item.publishedAt ?? undefined,
            ...(item.imageUrl ? { image: [item.imageUrl] } : {}),
            url: `https://www.openmindai.pl/aktualnosci/${item.slug}`,
            publisher: { '@type': 'Organization', name: 'OpenMind AI Consulting', url: 'https://www.openmindai.pl' },
          }
        : undefined,
    [item?.title, item?.excerpt, item?.publishedAt, item?.imageUrl, item?.slug],
  );

  usePageMeta({
    title: item
      ? `${item.title} | ${isEn ? 'News' : 'Aktualności'} OpenMind AI`
      : isEn ? 'News | OpenMind AI' : 'Aktualności | OpenMind AI',
    description: item?.excerpt || (isEn ? 'OpenMind AI company news.' : 'Aktualności z firmy OpenMind AI.'),
    path: `/aktualnosci/${slug ?? ''}`,
    ogType: 'article',
    ...(item?.imageUrl ? { ogImage: item.imageUrl } : {}),
    jsonLd,
  });

  return (
    <PageLayout>
      <main className="container mx-auto max-w-3xl px-4 sm:px-6 pt-32 pb-20">
        <Link to="/aktualnosci" className="text-xs font-semibold uppercase tracking-[0.15em] text-primary hover:underline">
          {isEn ? '← All news' : '← Wszystkie aktualności'}
        </Link>

        {isLoading && (
          <div className="flex justify-center py-16" role="status" aria-label={isEn ? 'Loading' : 'Ładowanie'}>
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        )}

        {!isLoading && !item && (
          <div className="py-16 text-center">
            <h1 className="font-heading text-3xl font-bold text-foreground">
              {isError
                ? isEn ? 'Could not load this news item' : 'Nie udało się wczytać aktualności'
                : isEn ? 'News item not found' : 'Nie znaleziono aktualności'}
            </h1>
          </div>
        )}

        {item && (
          <article className="mt-8">
            <header>
              <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-[0.15em]">
                {item.publishedAt && (
                  <time dateTime={item.publishedAt} className="text-muted-foreground">
                    {formatNewsDate(item.publishedAt, language)}
                  </time>
                )}
                {item.category && <span className="text-primary">{item.category}</span>}
              </div>
              <h1 className="font-heading text-3xl md:text-5xl font-bold leading-tight text-gradient">{item.title}</h1>
              {item.excerpt && <p className="mt-5 text-lg text-muted-foreground text-justify hyphens-auto" lang={language}>{item.excerpt}</p>}
            </header>

            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.title}
                className="mt-8 w-full rounded-2xl border border-border/30 object-cover"
                decoding="async"
              />
            )}

            <div
              lang={language}
              className="mt-10 space-y-5 text-foreground/85 leading-relaxed text-justify hyphens-auto [&_a]:text-primary [&_a]:underline [&_h2]:font-heading [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-10 [&_h3]:font-heading [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-foreground [&_h3]:mt-8 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mt-2 [&_blockquote]:border-l-2 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_img]:rounded-xl [&_strong]:text-foreground"
            >
              <ReactMarkdown>{item.content}</ReactMarkdown>
            </div>
          </article>
        )}
      </main>
      <Footer />
    </PageLayout>
  );
};

export default NewsArticle;
