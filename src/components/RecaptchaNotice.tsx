import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Wymagana informacja przy ukrytym badge'u reCAPTCHA (regulamin Google).
 */
const RecaptchaNotice = ({ className = '' }: { className?: string }) => {
  const { language } = useLanguage();

  return (
    <p className={`text-[11px] leading-snug text-muted-foreground/70 text-center ${className}`}>
      {language === 'pl' ? 'Chronione przez reCAPTCHA — ' : 'Protected by reCAPTCHA — '}
      <a
        href="https://policies.google.com/privacy"
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="underline hover:text-primary transition-colors"
      >
        {language === 'pl' ? 'Prywatność' : 'Privacy'}
      </a>
      {' · '}
      <a
        href="https://policies.google.com/terms"
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="underline hover:text-primary transition-colors"
      >
        {language === 'pl' ? 'Warunki' : 'Terms'}
      </a>
    </p>
  );
};

export default RecaptchaNotice;
