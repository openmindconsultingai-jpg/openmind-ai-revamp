import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';
import PageLayout from '@/components/PageLayout';
import { voivodeships } from '@/data/voivodeships';
import usePageMeta from '@/hooks/usePageMeta';

const Locations = () => {
  usePageMeta({
    title: 'Lokalizacje usług AI w Polsce | OpenMind AI',
    description:
      'Wdrożenia, konsulting i szkolenia AI w 192 miastach i 16 województwach Polski. Znajdź lokalną stronę usług OpenMind AI.',
    path: '/lokalizacje',
  });

  return (
    <PageLayout>
      <section className="container mx-auto max-w-6xl px-6 pb-20 pt-28 md:pt-36">
        <header className="mx-auto mb-14 max-w-3xl text-center">
          <h1 className="font-heading text-3xl font-bold sm:text-4xl md:text-5xl">
            <span className="text-gradient">Usługi AI w całej Polsce</span>
          </h1>
          <p className="mt-6 font-sans text-base leading-relaxed text-muted-foreground md:text-lg">
            Wybierz województwo lub miasto, aby sprawdzić lokalną ofertę wdrożeń,
            konsultingu, automatyzacji i szkoleń AI.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {voivodeships.map((voivodeship) => (
            <section key={voivodeship.slug} className="border-t border-border pt-5">
              <h2 className="font-heading text-lg font-semibold text-primary">
                <Link to={`/gdzie-dzialamy/${voivodeship.slug}`}>
                  Woj. {voivodeship.name.toLowerCase()}
                </Link>
              </h2>
              <ul className="mt-4 grid gap-2">
                {voivodeship.cities.map((city) => (
                  <li key={city.slug}>
                    <Link
                      to={`/gdzie-dzialamy/${voivodeship.slug}/${city.slug}`}
                      className="font-sans text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      AI w {city.locative}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>
      <Footer />
    </PageLayout>
  );
};

export default Locations;