import { useMemo } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import ContactForm from '@/components/ContactForm';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { findCity } from '@/data/voivodeships';
import usePageMeta from '@/hooks/usePageMeta';
import useCanonical from '@/hooks/useCanonical';

const CityDetail = () => {
  const { slug, citySlug } = useParams<{ slug: string; citySlug: string }>();
  const { language } = useLanguage();

  const result = slug && citySlug ? findCity(slug, citySlug) : null;
  const city = result?.city;
  const voivodeship = result?.voivodeship;

  const seoTitle = city
    ? `Szkolenia AI ${city.name} – Wdrożenia, Automatyzacja, Agencja Kreatywna | OpenMind AI`
    : 'OpenMind AI';

  const seoDescription = city && voivodeship
    ? `Szkolenia AI w ${city.locative} ✓ Wdrożenia sztucznej inteligencji ✓ Automatyzacja procesów ✓ Produkcja wideo i grafik AI ✓ Chatboty ✓ Doradztwo strategiczne. Bezpłatna konsultacja. Woj. ${voivodeship.name.toLowerCase()}.`
    : '';

  const seoKeywords = city && voivodeship
    ? `szkolenia AI ${city.name}, wdrożenia AI ${city.name}, kurs sztucznej inteligencji ${city.name}, automatyzacja procesów ${city.name}, agencja kreatywna AI ${city.name}, chatbot ${city.name}, produkcja wideo AI ${city.name}, tworzenie grafik AI ${city.name}, reklamy AI ${city.name}, filmy AI ${city.name}, zdjęcia AI ${city.name}, konsulting AI ${city.name}, transformacja cyfrowa ${city.name}, szkolenie ChatGPT ${city.name}, generatywna AI ${city.name}, ${voivodeship.name.toLowerCase()}`
    : '';

  const jsonLd = useMemo(() => {
    if (!city || !voivodeship) return undefined;
    return {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: `OpenMind AI – ${city.name}`,
      description: seoDescription,
      url: `https://openmindai.pl/gdzie-dzialamy/${slug}/${citySlug}`,
      areaServed: { '@type': 'City', name: city.name },
      provider: { '@type': 'Organization', name: 'OpenMind AI Consulting', url: 'https://openmindai.pl' },
      address: { '@type': 'PostalAddress', addressLocality: city.name, addressRegion: voivodeship.name, addressCountry: 'PL' },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Usługi AI',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: `Szkolenia AI w ${city.locative}` } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: `Wdrożenia AI w ${city.locative}` } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: `Agencja Kreatywna AI w ${city.locative}` } },
        ],
      },
    };
  }, [city, voivodeship, slug, citySlug, seoDescription]);

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
    ? `Szkolenia, wdrażanie i agencja kreatywna AI w ${city!.locative}`
    : `AI Training, Implementation & Creative Agency in ${city!.name}`;

  const paragraph1 = language === 'pl'
    ? `Szkolenia, wdrażanie i agencja kreatywna AI w ${city!.locative}. Jako regionalny lider transformacji cyfrowej, pomagamy firmom wdrażać technologie jutra, zapewniając realną oszczędność czasu, redukcję kosztów oraz pełne bezpieczeństwo danych w zgodzie z RODO. Nasz zespół ekspertów łączy strategiczne doradztwo z innowacyjną produkcją wizualną, budując przewagę konkurencyjną lokalnych przedsiębiorstw już dziś.`
    : `AI training, implementation, and creative agency in ${city!.name}. As a regional leader in digital transformation, we help businesses implement tomorrow's technologies, ensuring real time savings, cost reduction, and full GDPR-compliant data security. Our team of experts combines strategic consulting with innovative visual production, building competitive advantage for local businesses today.`;

  const paragraph2 = language === 'pl'
    ? `Oferujemy kompleksowe usługi sztucznej inteligencji dla firm w ${city!.locative}. Szkolenia AI, automatyzacja procesów, generatywne media i doradztwo strategiczne – zdalnie lub stacjonarnie w Twoim mieście.`
    : `We offer comprehensive AI services for businesses in ${city!.name}. AI training, process automation, generative media, and strategic consulting – remotely or on-site in your city.`;

  return (
    <PageLayout>
      <section className="pt-28 md:pt-36 pb-20 md:pb-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
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
                  {city!.name}
                </span>
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
                <span className="text-gradient">{heading}</span>
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mb-4">{paragraph1}</p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">{paragraph2}</p>
            </div>

            <div className="mb-14 md:mb-20 grid sm:grid-cols-3 gap-4">
              {[
                {
                  title: language === 'pl' ? 'Szkolenia AI' : 'AI Training',
                  desc: language === 'pl' ? 'Warsztaty i kursy dopasowane do Twojego zespołu' : 'Workshops and courses tailored to your team',
                },
                {
                  title: language === 'pl' ? 'Wdrożenia AI' : 'AI Implementation',
                  desc: language === 'pl' ? 'Automatyzacja i integracja rozwiązań AI w firmie' : 'Automation and integration of AI solutions',
                },
                {
                  title: language === 'pl' ? 'Agencja Kreatywna' : 'Creative Agency',
                  desc: language === 'pl' ? 'Generatywne media, branding i content AI' : 'Generative media, branding & AI content',
                },
              ].map((service) => (
                <div key={service.title} className="p-5 rounded-xl border border-border bg-card hover:border-primary/40 transition-colors">
                  <h3 className="font-semibold text-foreground mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.desc}</p>
                </div>
              ))}
            </div>

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
