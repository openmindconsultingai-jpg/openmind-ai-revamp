import { useMemo } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import Footer from '@/components/Footer';
import ServiceAreas from '@/components/ServiceAreas';
import usePageMeta from '@/hooks/usePageMeta';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { CheckCircle2, GraduationCap, Sparkles, Users } from 'lucide-react';
import { trainings, trainingsList, type TrainingData } from '@/data/trainings';

interface Props {
  /** Explicit slug. When omitted, taken from URL param `slug`. */
  slugOverride?: string;
}

const TrainingPage = ({ slugOverride }: Props) => {
  const params = useParams<{ slug?: string }>();
  const slug = slugOverride ?? params.slug ?? '';
  const data: TrainingData | undefined = trainings[slug];

  // NOTE: all hooks below must run unconditionally — the early Navigate must
  // come AFTER hook calls to keep hook order stable across renders.
    const course = {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: data.h1,
      description: data.metaDescription,
      provider: {
        '@type': 'Organization',
        name: 'OpenMind AI Consulting',
        url: 'https://www.openmindai.pl',
      },
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: ['online', 'onsite'],
        inLanguage: 'pl',
        location: { '@type': 'Country', name: 'Polska' },
      },
    };
    const faqPage = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: data.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    };
    const breadcrumb = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Strona główna', item: 'https://www.openmindai.pl/' },
        { '@type': 'ListItem', position: 2, name: 'Szkolenia AI', item: 'https://www.openmindai.pl/szkolenia-ai' },
        { '@type': 'ListItem', position: 3, name: data.h1, item: `https://www.openmindai.pl${data.path}` },
      ],
    };
    return { '@context': 'https://schema.org', '@graph': [course, faqPage, breadcrumb] };
  }, [data]);

  usePageMeta({
    title: data.metaTitle,
    description: data.metaDescription,
    keywords: data.keywords,
    path: data.path,
    jsonLd,
  });

  const ctaHref = data.ctaHref ?? '/contact.html';

  return (
    <PageLayout>
      <main className="relative pt-28 md:pt-32 pb-8">
        {/* Hero */}
        <section className="container mx-auto px-6 max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-1.5 text-xs md:text-sm text-primary/90 font-sans mb-6">
            <GraduationCap className="w-4 h-4" />
            Szkolenia AI — OpenMind AI
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">{data.h1}</span>
          </h1>
          <p className="font-sans text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {data.lead}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to={ctaHref}>
              <Button size="lg" className="font-semibold">
                Zapytaj o ofertę
              </Button>
            </Link>
            <Link to="/services.html">
              <Button variant="outline" size="lg" className="font-semibold">
                Zobacz wszystkie usługi
              </Button>
            </Link>
          </div>
        </section>

        {/* Intro copy */}
        <section className="container mx-auto px-6 max-w-4xl mt-16 md:mt-24">
          <div className="space-y-5 font-sans text-base md:text-lg leading-relaxed text-foreground/85 hyphens-auto" style={{ textAlign: 'justify', hyphens: 'auto' }}>
            {data.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        {/* Modules */}
        <section className="container mx-auto px-6 max-w-6xl mt-20 md:mt-28">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="text-gradient">Program szkolenia</span>
          </h2>
          <div className="grid gap-5 md:gap-6 sm:grid-cols-2">
            {data.modules.map((m, i) => (
              <div
                key={i}
                className="relative rounded-2xl p-6 md:p-7 transition hover:scale-[1.01]"
                style={{
                  background: 'hsl(220 15% 8% / 0.55)',
                  border: '1px solid hsl(176 100% 43% / 0.15)',
                  boxShadow: '0 4px 30px hsl(0 0% 0% / 0.25)',
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 shrink-0 rounded-lg bg-primary/10 p-2 text-primary">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg md:text-xl font-semibold text-foreground mb-2">
                      {m.title}
                    </h3>
                    <p className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Audience + outcomes */}
        <section className="container mx-auto px-6 max-w-6xl mt-20 md:mt-28 grid gap-8 md:grid-cols-2">
          <div
            className="rounded-2xl p-7 md:p-8"
            style={{
              background: 'hsl(220 15% 8% / 0.55)',
              border: '1px solid hsl(176 100% 43% / 0.15)',
            }}
          >
            <div className="flex items-center gap-2 mb-4 text-primary">
              <Users className="w-5 h-5" />
              <h3 className="font-heading text-xl md:text-2xl font-semibold">Dla kogo</h3>
            </div>
            <ul className="space-y-3">
              {data.audience.map((a, i) => (
                <li key={i} className="flex gap-3 font-sans text-sm md:text-base text-foreground/85">
                  <CheckCircle2 className="w-4 h-4 mt-1 text-primary shrink-0" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
          <div
            className="rounded-2xl p-7 md:p-8"
            style={{
              background: 'hsl(220 15% 8% / 0.55)',
              border: '1px solid hsl(176 100% 43% / 0.15)',
            }}
          >
            <div className="flex items-center gap-2 mb-4 text-primary">
              <Sparkles className="w-5 h-5" />
              <h3 className="font-heading text-xl md:text-2xl font-semibold">Co uczestnicy zyskują</h3>
            </div>
            <ul className="space-y-3">
              {data.outcomes.map((o, i) => (
                <li key={i} className="flex gap-3 font-sans text-sm md:text-base text-foreground/85">
                  <CheckCircle2 className="w-4 h-4 mt-1 text-primary shrink-0" />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Related trainings */}
        <section className="container mx-auto px-6 max-w-6xl mt-20 md:mt-28">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10">
            <span className="text-gradient">Pozostałe programy</span>
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trainingsList
              .filter((t) => t.slug !== data.slug)
              .map((t) => (
                <Link
                  key={t.slug}
                  to={`${t.path}.html`}
                  className="group rounded-2xl p-6 transition hover:scale-[1.01]"
                  style={{
                    background: 'hsl(220 15% 8% / 0.55)',
                    border: '1px solid hsl(176 100% 43% / 0.15)',
                  }}
                >
                  <h3 className="font-heading text-lg font-semibold text-primary group-hover:text-primary/80 mb-2">
                    {t.h1}
                  </h3>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                    {t.lead}
                  </p>
                </Link>
              ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="container mx-auto px-6 max-w-4xl mt-20 md:mt-28">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10">
            <span className="text-gradient">Najczęstsze pytania</span>
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {data.faq.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b border-primary/15">
                <AccordionTrigger className="text-left font-heading text-base md:text-lg font-semibold hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* City listing (reused component with training-specific anchors) */}
        <ServiceAreas
          id={`gdzie-${data.slug}`}
          heading={`${data.h1} w Twoim mieście`}
          sub={`Prowadzimy ${data.h1.toLowerCase()} w całej Polsce – zdalnie i stacjonarnie. Wybierz miasto, aby zobaczyć szczegóły lokalnej oferty.`}
          anchorPrefix={data.anchorPrefix}
        />

        {/* Bottom CTA */}
        <section className="container mx-auto px-6 max-w-4xl mt-4 mb-24 text-center">
          <div
            className="rounded-3xl p-10 md:p-14"
            style={{
              background:
                'linear-gradient(145deg, hsl(176 100% 43% / 0.08), hsl(220 15% 6% / 0.6))',
              border: '1px solid hsl(176 100% 43% / 0.25)',
            }}
          >
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">
              Zaplanujmy szkolenie dla Twojego zespołu
            </h2>
            <p className="font-sans text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              Krótkie spotkanie diagnostyczne wystarczy, żeby przygotować dopasowany program i wycenę.
            </p>
            <Link to={ctaHref}>
              <Button size="lg" className="font-semibold">
                Umów bezpłatną konsultację
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </PageLayout>
  );
};

export default TrainingPage;
