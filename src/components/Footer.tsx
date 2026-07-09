import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { trainingsList } from '@/data/trainings';

const Footer = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="border-t border-border py-12 bg-card">
      <div className="container mx-auto px-4">
        {/* Sitelinks — visible only in PL, since trainings are PL landing pages */}
        {language === 'pl' && (
          <nav
            aria-label="Szkolenia AI"
            className="mb-8 grid gap-6 md:grid-cols-4"
          >
            <div className="md:col-span-1">
              <h3 className="font-heading text-sm font-semibold text-primary mb-3 tracking-wide uppercase">
                Szkolenia AI
              </h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                Praktyczne warsztaty ze sztucznej inteligencji dla firm, szkół i zespołów – w całej Polsce.
              </p>
            </div>
            <ul className="md:col-span-3 grid gap-2 sm:grid-cols-2">
              {trainingsList.map((t) => (
                <li key={t.slug}>
                  <Link
                    to={`${t.path}.html`}
                    className="font-sans text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t.h1}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-border/60">
          <p className="text-muted-foreground">
            {t('footer.copyright')}
          </p>

          <div className="flex items-center gap-6">
            <Link
              to="/privacy.html"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {t('footer.privacy')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
