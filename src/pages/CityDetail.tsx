import { useMemo } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import ContactForm from '@/components/ContactForm';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, ArrowLeft, Building2, Lightbulb, Clock, HelpCircle, Navigation, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { findCity, voivodeships } from '@/data/voivodeships';
import { findCityContent } from '@/data/cityContent';
import usePageMeta from '@/hooks/usePageMeta';
import useCanonical from '@/hooks/useCanonical';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const CityDetail = () => {
  const { slug, citySlug } = useParams<{ slug: string; citySlug: string }>();
  const { language } = useLanguage();

  const result = slug && citySlug ? findCity(slug, citySlug) : null;
  const city = result?.city;
  const voivodeship = result?.voivodeship;
  const content = slug && citySlug ? findCityContent(slug, citySlug) : undefined;

  // Resolve nearby cities to their full data for linking
  const nearbyCities = useMemo(() => {
    if (!content?.najblizszeMiasta || !voivodeship) return [];
    return content.najblizszeMiasta
      .map((nearbySlug) => {
        // Search across all voivodeships
        for (const v of voivodeships) {
          const c = v.cities.find((ci) => ci.slug === nearbySlug);
          if (c) return { city: c, voivodeship: v };
        }
        return null;
      })
      .filter(Boolean) as { city: typeof city; voivodeship: typeof voivodeship }[];
  }, [content, voivodeship]);

  const seoTitle = city
    ? language === 'pl'
      ? `Szkolenia AI ${city.name} – Wdrożenia, Automatyzacja, Agencja Kreatywna | OpenMind AI`
      : `AI Training ${city.name} – Implementation, Automation, Creative Agency | OpenMind AI`
    : 'OpenMind AI';

  const seoDescription = city && voivodeship
    ? language === 'pl'
      ? `Szkolenia AI w ${city.locative} ✓ Wdrożenia sztucznej inteligencji ✓ Automatyzacja procesów ✓ Produkcja wideo i grafik AI ✓ Chatboty ✓ Doradztwo strategiczne. Bezpłatna konsultacja. Woj. ${voivodeship.name.toLowerCase()}.`
      : `AI Training in ${city.name} ✓ Artificial intelligence implementation ✓ Process automation ✓ AI video & graphics production ✓ Chatbots ✓ Strategic consulting. Free consultation. ${voivodeship.name} voivodeship.`
    : '';

  const seoKeywords = city && voivodeship
    ? language === 'pl'
      ? (content?.lokalneKeywordy?.join(', ') || `szkolenia AI ${city.name}, wdrożenia AI ${city.name}, kurs sztucznej inteligencji ${city.name}, automatyzacja procesów ${city.name}`)
      : `AI training ${city.name}, AI implementation ${city.name}, artificial intelligence course ${city.name}, process automation ${city.name}`
    : '';

  // Resolve localized content fields
  const enData = content?.en;
  const isEn = language === 'en';
  // When EN is selected but no en translations exist, treat detailed content as unavailable
  const hasLocalizedContent = content && (!isEn || !!enData);
  const localOpisGospodarki = isEn && enData?.opisGospodarki ? enData.opisGospodarki : content?.opisGospodarki;
  const localBranzeKluczowe = isEn && enData?.branzeKluczowe ? enData.branzeKluczowe : content?.branzeKluczowe;
  const localWyzwaniaAI = isEn && enData?.wyzwaniaAI ? enData.wyzwaniaAI : content?.wyzwaniaAI;
  const localCzasDojazdu = isEn && enData?.czasDojazdu ? enData.czasDojazdu : content?.czasDojazdu;
  const localPrzykladZastosowania = isEn && enData?.przykladZastosowania ? enData.przykladZastosowania : content?.przykladZastosowania;
  const localFaq = isEn && enData?.faq ? enData.faq.map(f => ({ pytanie: f.question, odpowiedz: f.answer })) : (!isEn ? content?.faq : undefined);

  const jsonLd = useMemo(() => {
    if (!city || !voivodeship) return undefined;
    const faqItems = localFaq?.map((f) => ({
      '@type': 'Question',
      name: f.pytanie,
      acceptedAnswer: { '@type': 'Answer', text: f.odpowiedz },
    }));
    const dateModified = new Date().toISOString().split('T')[0];
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'LocalBusiness',
          '@id': `https://www.openmindai.pl/gdzie-dzialamy/${slug}/${citySlug}#business`,
          name: `OpenMind AI Consulting – ${city.name}`,
          description: seoDescription,
          url: `https://www.openmindai.pl/gdzie-dzialamy/${slug}/${citySlug}`,
          areaServed: {
            '@type': 'City',
            name: city.name,
            containedInPlace: {
              '@type': 'AdministrativeArea',
              name: voivodeship.name,
            },
          },
          provider: { '@type': 'Organization', name: 'OpenMind AI Consulting', url: 'https://www.openmindai.pl' },
          address: { '@type': 'PostalAddress', addressLocality: city.name, addressRegion: voivodeship.name, addressCountry: 'PL' },
          serviceType: ['Konsulting AI', 'Szkolenia AI', 'Wdrożenia AI', 'Automatyzacja procesów', 'Agencja Kreatywna AI'],
          dateModified,
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Usługi AI',
            itemListElement: [
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: `Szkolenia AI w ${city.locative}` } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: `Wdrożenia AI w ${city.locative}` } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: `Agencja Kreatywna AI w ${city.locative}` } },
            ],
          },
        },
        ...(faqItems?.length ? [{
          '@type': 'FAQPage',
          mainEntity: faqItems,
        }] : []),
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Strona główna', item: 'https://www.openmindai.pl/' },
            { '@type': 'ListItem', position: 2, name: 'Gdzie działamy', item: 'https://www.openmindai.pl/#gdzie-dzialamy' },
            { '@type': 'ListItem', position: 3, name: voivodeship.name, item: `https://www.openmindai.pl/gdzie-dzialamy/${slug}` },
            { '@type': 'ListItem', position: 4, name: city.name, item: `https://www.openmindai.pl/gdzie-dzialamy/${slug}/${citySlug}` },
          ],
        },
      ],
    };
  }, [city, voivodeship, slug, citySlug, seoDescription, localFaq]);

  useCanonical();

  usePageMeta({
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
    path: `/gdzie-dzialamy/${slug}/${citySlug}`,
    jsonLd,
  });

  if (!result) return <Navigate to="/" replace />;

  const heading = language === 'pl'
    ? `Wdrożenia AI, szkolenia ChatGPT i konsulting dla firm w ${city!.locative}`
    : `AI Implementation, ChatGPT Training & Consulting in ${city!.name}`;

  return (
    <PageLayout>
      <section className="pt-28 md:pt-36 pb-20 md:pb-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">

            {/* Visual Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground flex-wrap">
              <Link to="/" className="hover:text-foreground transition-colors">{language === 'pl' ? 'Strona główna' : 'Home'}</Link>
              <ChevronRight className="w-3.5 h-3.5 shrink-0" />
              <Link to="/#gdzie-dzialamy" className="hover:text-foreground transition-colors">{language === 'pl' ? 'Gdzie działamy' : 'Where We Operate'}</Link>
              <ChevronRight className="w-3.5 h-3.5 shrink-0" />
              <Link to={`/gdzie-dzialamy/${slug}.html`} className="hover:text-foreground transition-colors">{voivodeship!.name}</Link>
              <ChevronRight className="w-3.5 h-3.5 shrink-0" />
              <span className="text-foreground font-medium">{city!.name}</span>
            </nav>

            <Link to="/#gdzie-dzialamy">
              <Button variant="ghost" className="mb-8 gap-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4" />
                {language === 'pl' ? 'Powrót do mapy' : 'Back to areas'}
              </Button>
            </Link>

            <div className="mb-12 md:mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-primary tracking-wider uppercase">
                  {city!.name}{content ? ` · ${content.populacja} ${language === 'pl' ? 'mieszkańców' : 'residents'}` : ''}
                </span>
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
                <span className="text-gradient">{heading}</span>
              </h1>

              {/* Quick Answer Block — optimized for GEO/AEO (AI citation) */}
              <div className="mb-10 p-6 rounded-xl border border-primary/20 bg-primary/5" role="region" aria-label={language === 'pl' ? 'Podsumowanie usług' : 'Service summary'}>
                <p className="text-base sm:text-lg text-foreground leading-relaxed">
                  {hasLocalizedContent ? (
                    language === 'pl' ? (
                      <>
                        OpenMind AI Consulting świadczy usługi wdrożeń AI, szkoleń z najlepszych narzędzi AI na rynku oraz konsultingu strategicznego dla firm z {city!.name} ({voivodeship!.name}, {content.populacja} mieszkańców). {content.wyzwaniaAI} Pierwsze konsultacje są bezpłatne, szkolenia dostępne stacjonarnie i online, wdrożenia realizowane etapowo z pierwszymi efektami już w ciągu kilku dni lub tygodni, w zależności od stopnia zaawansowania projektu.
                      </>
                    ) : (
                      <>
                        OpenMind AI Consulting provides AI implementation services, training with the best AI tools on the market, and strategic consulting for businesses in {city!.name} ({voivodeship!.name}, {content.populacja} residents). {localWyzwaniaAI} First consultations are free, training available on-site and online, implementations delivered in stages with first results within days or weeks, depending on project complexity.
                      </>
                    )
                  ) : (
                    language === 'pl' ? (
                      <>
                        OpenMind AI Consulting świadczy usługi wdrożeń AI, szkoleń z najlepszych narzędzi AI na rynku oraz konsultingu strategicznego dla firm w {city!.locative}. Jako regionalny lider transformacji cyfrowej, pomagamy firmom wdrażać technologie jutra. Pierwsze konsultacje są bezpłatne, szkolenia dostępne stacjonarnie i online, wdrożenia realizowane etapowo z pierwszymi efektami już w ciągu kilku dni lub tygodni, w zależności od stopnia zaawansowania projektu.
                      </>
                    ) : (
                      <>
                        OpenMind AI Consulting provides AI implementation services, training with the best AI tools on the market, and strategic consulting for businesses in {city!.name}. As a regional leader in digital transformation, we help businesses implement tomorrow&apos;s technologies. First consultations are free, training available on-site and online, implementations delivered in stages with first results within days or weeks, depending on project complexity.
                      </>
                    )
                  )}
                </p>
              </div>

              {hasLocalizedContent ? (
                <>
                  {/* Opis gospodarki */}
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-3">
                      <Building2 className="w-5 h-5 text-primary" />
                      <h2 className="font-heading text-xl md:text-2xl font-semibold text-foreground">
                        {language === 'pl' ? `Gospodarka ${city!.name} i potencjał dla AI` : `Economy of ${city!.name} & AI Potential`}
                      </h2>
                    </div>
                    <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
                      {localOpisGospodarki}
                    </p>
                  </div>

                  {/* Kluczowe branże */}
                  <div className="mb-8">
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
                      {language === 'pl' ? `Kluczowe branże w ${city!.locative}` : `Key industries in ${city!.name}`}
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {(localBranzeKluczowe || []).map((branza) => (
                        <div key={branza} className="flex items-center gap-2 p-3 rounded-lg border border-border bg-card/50">
                          <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                          <span className="text-sm text-foreground">{branza}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Wyzwania AI */}
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="w-5 h-5 text-primary" />
                      <h2 className="font-heading text-xl md:text-2xl font-semibold text-foreground">
                        {language === 'pl' ? `Zastosowania AI dla firm z ${city!.name}` : `AI Applications for Businesses in ${city!.name}`}
                      </h2>
                    </div>
                    <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
                      {localWyzwaniaAI}
                    </p>
                  </div>

                  {/* Przykład zastosowania */}
                  <div className="mb-8 p-5 rounded-xl border border-primary/20 bg-primary/5">
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                      {language === 'pl' ? 'Przykładowy scenariusz wdrożenia' : 'Example Implementation Scenario'}
                    </h3>
                    <p className="text-base text-foreground leading-relaxed">
                      {localPrzykladZastosowania}
                    </p>
                  </div>

                  {/* Czas dojazdu */}
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="w-5 h-5 text-primary" />
                      <h2 className="font-heading text-xl md:text-2xl font-semibold text-foreground">
                        {language === 'pl' ? `Jak obsługujemy klientów z ${city!.name}` : `How We Serve Clients in ${city!.name}`}
                      </h2>
                    </div>
                    <p className="text-sm text-muted-foreground">{localCzasDojazdu}</p>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mb-4">
                    {language === 'pl'
                      ? `Szkolenia, wdrażanie i agencja kreatywna AI w ${city!.locative}. Jako regionalny lider transformacji cyfrowej, pomagamy firmom wdrażać technologie jutra, zapewniając realną oszczędność czasu, redukcję kosztów oraz pełne bezpieczeństwo danych w zgodzie z RODO. Nasz zespół ekspertów łączy strategiczne doradztwo z innowacyjną produkcją wizualną, budując przewagę konkurencyjną lokalnych przedsiębiorstw już dziś.`
                      : `AI training, implementation, and creative agency in ${city!.name}. As a regional leader in digital transformation, we help businesses implement tomorrow's technologies, ensuring real time savings, cost reduction, and full GDPR-compliant data security.`}
                  </p>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
                    {language === 'pl'
                      ? `Oferujemy kompleksowe usługi sztucznej inteligencji dla firm w ${city!.locative}. Szkolenia AI, automatyzacja procesów, generatywne media i doradztwo strategiczne – zdalnie lub stacjonarnie w Twoim mieście.`
                      : `We offer comprehensive AI services for businesses in ${city!.name}. AI training, process automation, generative media, and strategic consulting – remotely or on-site in your city.`}
                  </p>
                </>
              )}
            </div>

            {/* Service cards */}
            <div className="mb-14 md:mb-20 grid sm:grid-cols-3 gap-4">
              {[
                {
                  title: language === 'pl' ? 'Szkolenia AI' : 'AI Training',
                  desc: language === 'pl' ? 'Warsztaty i kursy dopasowane do Twojego zespołu' : 'Workshops and courses tailored to your team',
                  link: '/services/szkolenia-ai',
                },
                {
                  title: language === 'pl' ? 'Wdrożenia AI' : 'AI Implementation',
                  desc: language === 'pl' ? 'Automatyzacja i integracja rozwiązań AI w firmie' : 'Automation and integration of AI solutions',
                  link: '/services/automatyzacja-ai',
                },
                {
                  title: language === 'pl' ? 'Agencja Kreatywna' : 'Creative Agency',
                  desc: language === 'pl' ? 'Generatywne media, branding i content AI' : 'Generative media, branding & AI content',
                  link: '/services/agencja-kreatywna-ai',
                },
              ].map((service) => (
                <Link key={service.title} to={service.link} className="p-5 rounded-xl border border-border bg-card hover:border-primary/40 transition-colors block">
                  <h3 className="font-semibold text-foreground mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.desc}</p>
                </Link>
              ))}
            </div>

            {/* FAQ */}
            {localFaq && localFaq.length > 0 && (
              <div className="mb-14 md:mb-20">
                <div className="flex items-center gap-2 mb-6">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  <h2 className="font-heading text-2xl md:text-3xl font-bold">
                    <span className="text-gradient">
                      {language === 'pl' ? `Najczęstsze pytania o AI w ${city!.locative}` : `FAQ about AI in ${city!.name}`}
                    </span>
                  </h2>
                </div>
                <Accordion type="single" collapsible className="space-y-3">
                  {localFaq.map((item, i) => (
                    <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-xl px-5">
                      <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                        {item.pytanie}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {item.odpowiedz}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}

            {/* Nearby cities — internal links */}
            {nearbyCities.length > 0 && (
              <div className="mb-14 md:mb-20">
                <div className="flex items-center gap-2 mb-6">
                  <Navigation className="w-5 h-5 text-primary" />
                  <h2 className="font-heading text-xl md:text-2xl font-semibold text-foreground">
                    {language === 'pl' ? `Obsługujemy też firmy z okolic ${city!.name}` : `We also serve businesses near ${city!.name}`}
                  </h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  {nearbyCities.map((nearby) => (
                    <Link
                      key={nearby.city!.slug}
                      to={`/gdzie-dzialamy/${nearby.voivodeship!.slug}/${nearby.city!.slug}.html`}
                      className="px-4 py-2 rounded-lg border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-colors text-sm font-medium text-foreground"
                    >
                      {nearby.city!.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mb-14 md:mb-20 text-center p-8 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3">
                <span className="text-gradient">
                  {language === 'pl' ? `Gotowy na wdrożenie AI w Twojej firmie z ${city!.name}?` : `Ready for AI implementation in ${city!.name}?`}
                </span>
              </h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                {language === 'pl'
                  ? 'Pierwsza rozmowa konsultacyjna jest bezpłatna. Skontaktuj się i sprawdź, co AI może zrobić dla Twojego biznesu.'
                  : 'The first consultation is free. Get in touch and find out what AI can do for your business.'}
              </p>
              <Link to="/contact.html">
                <Button size="lg" className="px-8">
                  {language === 'pl' ? 'Umów bezpłatną rozmowę' : 'Schedule a free call'}
                </Button>
              </Link>
            </div>

            {/* Contact form */}
            <div className="max-w-2xl mx-auto">
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-2 text-center">
                <span className="text-gradient">
                  {language === 'pl' ? 'Skontaktuj się z nami' : 'Get in Touch'}
                </span>
              </h2>
              <p className="text-center text-muted-foreground mb-8">
                {language === 'pl' ? 'Napisz do nas – odpowiemy w ciągu 24 godzin' : "Write to us – we'll respond within 24 hours"}
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default CityDetail;
