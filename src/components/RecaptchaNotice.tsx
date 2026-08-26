import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Wymagana informacja przy ukrytym badge'u reCAPTCHA (regulamin Google).
 */
const RecaptchaNotice = ({ className = '' }: { className?: string }) => {
  const { language } = useLanguage();

  return (
    <p className={`text-xs leading-snug text-muted-foreground/70 text-center ${className}`}>
      {language === 'pl' ? (
        <>
          Ta strona jest chroniona przez reCAPTCHA. Obowiązuje{' '}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary transition-colors"
          >
            Polityka prywatności
          </a>{' '}
          i{' '}
          <a
            href="https://policies.google.com/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary transition-colors"
          >
            Regulamin
          </a>{' '}
          Google.
        </>
      ) : (
        <>
          This site is protected by reCAPTCHA. The{' '}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary transition-colors"
          >
            Google Privacy Policy
          </a>{' '}
          and{' '}
          <a
            href="https://policies.google.com/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary transition-colors"
          >
            Terms of Service
          </a>{' '}
          apply.
        </>
      )}
    </p>
  );
};

export default RecaptchaNotice;
