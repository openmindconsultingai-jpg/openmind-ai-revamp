import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border py-8 bg-card">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
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
