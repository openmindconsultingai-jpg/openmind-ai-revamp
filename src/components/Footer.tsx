import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { servicesList } from '@/data/services';

const Footer = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="border-t border-border py-12 bg-card">
      <div className="container mx-auto px-4">
        {/* Sitelinks — PL only, since service landing pages are PL */}
        {language === 'pl' && (
          <nav aria-label="Usługi AI" className="mb-8 grid gap-6 md:grid-cols-4">
            <div className="md:col-span-1">
              <h3 className="font-heading text-sm font-semibold text-primary mb-3 tracking-wide uppercase">
                Usługi AI
              </h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                Automatyzacje, szkolenia, teledyski AI, strony WWW i konsultacje — cała Polska.
              </p>
              <Link
                to="/services.html"
                className="mt-3 inline-block font-sans text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                Zobacz wszystkie →
              </Link>
            </div>
            <ul className="md:col-span-3 grid gap-2 sm:grid-cols-2">
              {servicesList.map((s) => (
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
