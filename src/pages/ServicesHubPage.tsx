import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import Footer from '@/components/Footer';
import usePageMeta from '@/hooks/usePageMeta';
import { Button } from '@/components/ui/button';
import {
  HUB,
  services,
  servicesList,
  bodySections,
  INDUSTRY_TRAINING_SLUGS,
} from '@/data/services';

const glassCard: React.CSSProperties = {
  background: 'hsl(220 15% 8% / 0.55)',
  border: '1px solid hsl(176 100% 43% / 0.15)',
  boxShadow: '0 4px 30px hsl(0 0% 0% / 0.25)',
};

const justify: React.CSSProperties = {
  textAlign: 'justify',
  hyphens: 'auto' as React.CSSProperties['hyphens'],
};

/** Slugs treated as "training" and hidden behind the single "Szkolenia AI" card. */
const TRAINING_SLUGS = new Set<string>([
  'szkolenia-ai',
  'szkolenia-ai-stacjonarne',
  'szkolenia-ai-online',
  'szkolenia-ai-indywidualne',
  'ai-dla-szkol',
  ...INDUSTRY_TRAINING_SLUGS,
]);

const FORMAT_SLUGS = [
  'szkolenia-ai-stacjonarne',
  'szkolenia-ai-online',
  'szkolenia-ai-indywidualne',
];

/**
 * /services.html hub. Non-training services rendered as cards.
 * A single "Szkolenia AI" card expands inline to reveal all training paths
 * (formats, AI for schools, and 9 industry-specific pages).
 */
const ServicesHubPage = () => {
  const [openTraining, setOpenTraining] = useState(false);

  const jsonLd = useMemo(
    () => ({ '@context': 'https://schema.org', '@graph': HUB.jsonld }),
    [],
  );

  usePageMeta({
    title: HUB.title,
    description: HUB.description,
    path: '/services.html',
    jsonLd,
  });

  const whyBlock = bodySections(HUB).find((s) => /Dlaczego/i.test(s.h2));

  const nonTraining = servicesList.filter((s) => !TRAINING_SLUGS.has(s.slug));
  const trainingHub = services['szkolenia-ai'];
  const formatEntries = FORMAT_SLUGS.map((s) => services[s]).filter(Boolean);
  const industryEntries = INDUSTRY_TRAINING_SLUGS.map((s) => services[s]).filter(Boolean);
  const schoolsEntry = services['ai-dla-szkol'];

  return (
    <PageLayout>
      <main className="relative pt-28 md:pt-32 pb-8">
        {/* Hero */}
        <section className="container mx-auto px-6 max-w-5xl text-center">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-gradient">{HUB.h1}</span>
          </h1>
          <p
            className="font-sans text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            style={justify}
          >
            Sześć obszarów, jedna zasada: rozwiązania, które działają w produkcji miesiącami —
            nie efektowne demo. Każda usługa ma osobną stronę ze szczegółami, programem i FAQ.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/contact.html">
              <Button size="lg" className="font-semibold">
                Umów bezpłatną konsultację
              </Button>
            </Link>
          </div>
        </section>

        {/* Services grid */}
        <section className="container mx-auto px-6 max-w-6xl mt-16 md:mt-24">
          <div className="grid gap-5 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {nonTraining.map((s) => (
              <Link
                key={s.slug}
                to={`${s.path}.html`}
                className="group rounded-2xl p-6 md:p-7 transition hover:scale-[1.01]"
                style={glassCard}
              >
                <h2 className="font-heading text-lg md:text-xl font-semibold text-primary group-hover:text-primary/80 mb-3">
                  {s.navLabel}
                </h2>
                <p
                  className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed"
                  style={justify}
                >
                  {s.shortDesc}
                </p>
                <span className="mt-4 inline-block font-sans text-sm font-semibold text-primary">
                  Poznaj →
                </span>
              </Link>
            ))}

            {/* Trainings — single expandable card */}
            {trainingHub && (
              <button
                type="button"
                onClick={() => setOpenTraining((v) => !v)}
                aria-expanded={openTraining}
                aria-controls="trainings-panel"
                className="group rounded-2xl p-6 md:p-7 text-left transition hover:scale-[1.01]"
                style={glassCard}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h2 className="font-heading text-lg md:text-xl font-semibold text-primary group-hover:text-primary/80">
                    {trainingHub.navLabel}
                  </h2>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-primary transition-transform duration-300 ${
                      openTraining ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                <p
                  className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed"
                  style={justify}
                >
                  {trainingHub.shortDesc}
                </p>
                <span className="mt-4 inline-block font-sans text-sm font-semibold text-primary">
                  {openTraining ? 'Zwiń listę szkoleń' : 'Zobacz wszystkie szkolenia →'}
                </span>
              </button>
            )}
          </div>

          {/* Expanded trainings panel */}
          {trainingHub && (
            <div
              id="trainings-panel"
              className={`grid transition-all duration-500 ease-out ${
                openTraining
                  ? 'grid-rows-[1fr] opacity-100 mt-6'
                  : 'grid-rows-[0fr] opacity-0 mt-0'
              }`}
            >
              <div className="overflow-hidden">
                <div
                  className="rounded-2xl p-6 md:p-8"
                  style={{
                    ...glassCard,
                    background:
                      'linear-gradient(145deg, hsl(176 100% 43% / 0.06), hsl(220 15% 6% / 0.6))',
                    border: '1px solid hsl(176 100% 43% / 0.22)',
                  }}
                >
                  {/* Overview link */}
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <p
                      className="font-sans text-sm md:text-base text-muted-foreground max-w-2xl"
                      style={justify}
                    >
                      Warsztaty AI dopasowane do formatu, branży i roli. Wszystkie programy
                      prowadzone przez praktyków, z certyfikatem i materiałami do wdrożenia.
                    </p>
                    <Link
                      to="/szkolenia-ai.html"
                      className="font-sans text-sm font-semibold text-primary hover:text-primary/80 whitespace-nowrap"
                    >
                      Strona główna szkoleń →
                    </Link>
                  </div>

                  {/* Formats */}
                  <h3 className="font-heading text-sm md:text-base font-semibold text-foreground/90 uppercase tracking-wider mb-4">
                    Formaty
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
                    {formatEntries.map((s) => (
                      <Link
                        key={s.slug}
                        to={`${s.path}.html`}
                        className="group rounded-xl p-4 md:p-5 transition hover:scale-[1.01]"
                        style={{
                          background: 'hsl(220 15% 6% / 0.55)',
                          border: '1px solid hsl(176 100% 43% / 0.12)',
                        }}
                      >
                        <h4 className="font-heading text-base font-semibold text-primary group-hover:text-primary/80 mb-2">
                          {s.navLabel}
                        </h4>
                        <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed">
                          {s.shortDesc}
                        </p>
                      </Link>
                    ))}
                    {schoolsEntry && (
                      <Link
                        to={`${schoolsEntry.path}.html`}
                        className="group rounded-xl p-4 md:p-5 transition hover:scale-[1.01]"
                        style={{
                          background: 'hsl(220 15% 6% / 0.55)',
                          border: '1px solid hsl(176 100% 43% / 0.12)',
                        }}
                      >
                        <h4 className="font-heading text-base font-semibold text-primary group-hover:text-primary/80 mb-2">
                          {schoolsEntry.navLabel}
                        </h4>
                        <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed">
                          {schoolsEntry.shortDesc}
                        </p>
                      </Link>
                    )}
                  </div>

                  {/* Industries */}
                  {industryEntries.length > 0 && (
                    <>
                      <h3 className="font-heading text-sm md:text-base font-semibold text-foreground/90 uppercase tracking-wider mb-4">
                        Szkolenia branżowe
                      </h3>
                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {industryEntries.map((s) => (
                          <Link
                            key={s.slug}
                            to={`${s.path}.html`}
                            className="group rounded-lg px-4 py-3 transition"
                            style={{
                              background: 'hsl(220 15% 6% / 0.45)',
                              border: '1px solid hsl(176 100% 43% / 0.1)',
                            }}
                          >
                            <span className="font-sans text-sm font-medium text-foreground/85 group-hover:text-primary">
                              {s.navLabel}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Why us */}
        {whyBlock && (
          <section className="container mx-auto px-6 max-w-6xl mt-20 md:mt-28">
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-10">
              <span className="text-gradient">{whyBlock.h2}</span>
            </h2>
            <div className="grid gap-5 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {whyBlock.subs.map((sub, i) => (
                <div key={i} className="rounded-2xl p-6 md:p-7" style={glassCard}>
                  <h3 className="font-heading text-lg md:text-xl font-semibold text-foreground mb-3">
                    {sub.h3}
                  </h3>
                  {sub.p.map((p, j) => (
                    <p
                      key={j}
                      className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed"
                      style={justify}
                    >
                      {p}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <section className="container mx-auto px-6 max-w-4xl mt-20 mb-24 text-center">
          <div
            className="rounded-3xl p-10 md:p-14"
            style={{
              background:
                'linear-gradient(145deg, hsl(176 100% 43% / 0.08), hsl(220 15% 6% / 0.6))',
              border: '1px solid hsl(176 100% 43% / 0.25)',
            }}
          >
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">
              Porozmawiajmy o Twoim projekcie
            </h2>
            <p
              className="font-sans text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-6"
              style={justify}
            >
              Pierwsza konsultacja (30–45 minut, online lub w naszej siedzibie) jest zawsze
              bezpłatna i niezobowiązująca. Odpowiadamy w ciągu 24 godzin w dni robocze.
            </p>
            <Link to="/contact.html">
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

export default ServicesHubPage;
