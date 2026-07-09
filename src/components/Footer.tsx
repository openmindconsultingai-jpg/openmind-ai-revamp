import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { servicesList, INDUSTRY_TRAINING_SLUGS } from '@/data/services';

const Footer = () => {
  const { t, language } = useLanguage();

  const coreServices = servicesList.filter((s) => !INDUSTRY_TRAINING_SLUGS.includes(s.slug));
  const industryServices = servicesList.filter((s) => INDUSTRY_TRAINING_SLUGS.includes(s.slug));

  return (
    <footer className="border-t border-border py-12 bg-card">
      <div className="container mx-auto px-4">
        {/* Sitelinks — PL only, since service landing pages are PL */}
        {language === 'pl' && (
          <nav aria-label="Usługi AI" className="mb-8 grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="font-heading text-sm font-semibold text-primary mb-3 tracking-wide uppercase">
                Usługi AI
              </h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-3">
                Automatyzacje, szkolenia, teledyski AI, strony WWW i konsultacje — cała Polska.
              </p>
              <Link
                to="/services.html"
                className="inline-block font-sans text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                Zobacz wszystkie →
              </Link>
            </div>
            <div>
              <h3 className="font-heading text-sm font-semibold text-primary mb-3 tracking-wide uppercase">
                Główne usługi
              </h3>
              <ul className="grid gap-2">
                {coreServices.map((s) => (
                  <li key={s.slug}>
                    <Link
                      to={`${s.path}.html`}
                      className="font-sans text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {s.navLabel}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-heading text-sm font-semibold text-primary mb-3 tracking-wide uppercase">
                Szkolenia branżowe
              </h3>
              <ul className="grid gap-2">
                {industryServices.map((s) => (
                  <li key={s.slug}>
                    <Link
                      to={`${s.path}.html`}
                      className="font-sans text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {s.navLabel}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        )}


        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-border/60">
          <p className="font-sans text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} OpenMind AI Consulting. {t('footer.rights')}
          </p>
          <Link
            to="/privacy.html"
            className="font-sans text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            {t('footer.privacy')}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
