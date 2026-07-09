import { useMemo } from 'react';
import { Link, Navigate, useLocation, useParams } from 'react-router-dom';
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
import {
  bodySections,
  extractFaq,
  services,
  servicesList,
  type ServiceEntry,
} from '@/data/services';

interface Props {
  /** Explicit slug; when omitted, taken from route param `slug`. */
  slugOverride?: string;
}

const glassCard: React.CSSProperties = {
  background: 'hsl(220 15% 8% / 0.55)',
  border: '1px solid hsl(176 100% 43% / 0.15)',
  boxShadow: '0 4px 30px hsl(0 0% 0% / 0.25)',
};

const justify: React.CSSProperties = {
  textAlign: 'justify',
  hyphens: 'auto' as React.CSSProperties['hyphens'],
};

/**
 * Generic template for all 9 service SEO landing pages.
 * Content comes from src/data/services/*.json (mirrors of the .htm prototypes).
 * Explicitly icon-free per user request.
 */
const ServiceLandingPage = ({ slugOverride }: Props) => {
  const { pathname } = useLocation();
  const params = useParams<{ slug?: string }>();
  const slug = slugOverride ?? params.slug ?? pathname.replace(/^\/+|\.html$|\/+$/g, '');
  const entry: ServiceEntry | undefined = services[slug];

  // Keep hook order stable — early-return only after hooks have run.
  const safe: ServiceEntry = entry ?? servicesList[0];

  const faq = useMemo(() => extractFaq(safe.data), [safe]);
  const sections = useMemo(() => bodySections(safe.data), [safe]);

  const jsonLd = useMemo(
    () => ({ '@context': 'https://schema.org', '@graph': safe.data.jsonld }),
    [safe],
  );

  usePageMeta({
    title: safe.data.title,
    description: safe.data.description,
    path: `${safe.path}.html`,
    jsonLd,
  });

  if (!entry) return <Navigate to="/services.html" replace />;

  const related = servicesList.filter((s) => s.slug !== safe.slug).slice(0, 6);

  return (
    <PageLayout>
      <main className="relative pt-28 md:pt-32 pb-8">
        {/* Hero */}
        <section className="container mx-auto px-6 max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-1.5 text-xs md:text-sm text-primary/90 font-sans mb-6">
            OpenMind AI · Usługi
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-gradient">{safe.data.h1}</span>
          </h1>
          <p
            className="font-sans text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            style={justify}
          >
            {safe.shortDesc}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/contact.html">
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

        {/* Body sections */}
        <div className="container mx-auto px-6 max-w-5xl mt-16 md:mt-24 space-y-16 md:space-y-24">
          {sections.map((sec, si) => (
            <section key={si}>
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
                <span className="text-gradient">{sec.h2}</span>
              </h2>

              {sec.p.length > 0 && (
                <div
                  className="space-y-4 font-sans text-base md:text-lg leading-relaxed text-foreground/85"
                  style={justify}
                >
                  {sec.p.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              )}

              {sec.li.length > 0 && (
                <ul className="mt-4 grid gap-3 md:grid-cols-2">
                  {sec.li.map((li, i) => (
                    <li
                      key={i}
                      className="rounded-xl p-4 font-sans text-sm md:text-base text-foreground/85"
                      style={glassCard}
                    >
                      {li}
                    </li>
                  ))}
                </ul>
              )}

              {sec.subs.length > 0 && (
                <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {sec.subs.map((sub, i) => (
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
                      {sub.li.length > 0 && (
                        <ul className="mt-3 space-y-1.5 font-sans text-sm text-muted-foreground list-disc list-inside">
                          {sub.li.map((li, j) => (
                            <li key={j}>{li}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>

        {/* City listing — only on flagged services */}
        {safe.showCities && (
          <ServiceAreas
            id={`gdzie-${safe.slug}`}
            heading={`${safe.navLabel} w Twoim mieście`}
            sub={`Działamy w całej Polsce — zdalnie i stacjonarnie. Wybierz miasto, aby zobaczyć szczegóły lokalnej oferty.`}
            anchorPrefix={safe.citiesAnchorPrefix ?? safe.navLabel}
          />
        )}

        {/* FAQ */}
        {faq.length > 0 && (
          <section className="container mx-auto px-6 max-w-4xl mt-20 md:mt-28">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10">
              <span className="text-gradient">Najczęstsze pytania</span>
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faq.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border-b border-primary/15"
                >
                  <AccordionTrigger className="text-left font-heading text-base md:text-lg font-semibold hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent
                    className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed"
                    style={justify}
                  >
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        )}

        {/* Related services — text-only cards, no icons */}
        <section className="container mx-auto px-6 max-w-6xl mt-20 md:mt-28">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10">
            <span className="text-gradient">Pozostałe usługi</span>
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((s) => (
              <Link
                key={s.slug}
                to={`${s.path}.html`}
                className="group rounded-2xl p-6 transition hover:scale-[1.01]"
                style={glassCard}
              >
                <h3 className="font-heading text-lg font-semibold text-primary group-hover:text-primary/80 mb-2">
                  {s.navLabel}
                </h3>
                <p
                  className="font-sans text-sm text-muted-foreground leading-relaxed"
                  style={justify}
                >
                  {s.shortDesc}
                </p>
              </Link>
            ))}
          </div>
        </section>

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

export default ServiceLandingPage;
