import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import Footer from '@/components/Footer';
import usePageMeta from '@/hooks/usePageMeta';
import { Button } from '@/components/ui/button';
import { HUB, servicesList, bodySections } from '@/data/services';

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
 * /services.html hub. Grid of 9 service cards (no icons), followed by
 * the "Dlaczego OpenMind AI" block from the prototype and a closing CTA.
 */
const ServicesHubPage = () => {
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

  // "Dlaczego OpenMind AI" section from prototype (2nd section)
  const whyBlock = bodySections(HUB).find((s) => /Dlaczego/i.test(s.h2));

  return (
    <PageLayout>
      <main className="relative pt-28 md:pt-32 pb-8">
        {/* Hero */}
        <section className="container mx-auto px-6 max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-1.5 text-xs md:text-sm text-primary/90 font-sans mb-6">
            OpenMind AI · Pełna oferta
          </div>
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

        {/* Services grid — text-only, no icons */}
        <section className="container mx-auto px-6 max-w-6xl mt-16 md:mt-24">
          <div className="grid gap-5 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {servicesList.map((s) => (
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
          </div>
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
