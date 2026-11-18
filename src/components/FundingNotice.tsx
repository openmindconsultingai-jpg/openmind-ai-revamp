import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import openmindLogo from '@/assets/openmind-logo-nobg.webp';
import burLogo from '@/assets/parp-bur-light.png.asset.json';

const STORAGE_KEY = 'funding-notice-closed';

const FundingNotice = () => {
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    const t = setTimeout(() => setOpen(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    sessionStorage.setItem(STORAGE_KEY, '1');
    setOpen(false);
  };

  if (!open) return null;
  const pl = language !== 'en';

  return (
    <div
      role="dialog"
      aria-label={pl ? 'Dofinansowanie usług do 80%' : 'Up to 80% funding'}
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-2xl rounded-2xl border border-primary/30 bg-card/80 p-4 shadow-2xl backdrop-blur-xl sm:bottom-6 sm:p-5"
    >
      <button
        type="button"
        onClick={close}
        aria-label={pl ? 'Zamknij' : 'Close'}
        className="absolute right-2 top-2 rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground"
      >
        <X className="h-5 w-5" />
      </button>
      <div className="mb-3 flex items-center gap-4 pr-8">
        <img src={openmindLogo} alt="OpenMind AI Consulting" className="h-10 w-auto" width="34" height="40" />
        <span aria-hidden className="h-8 w-px bg-border" />
        <img src={burLogo.url} alt="PARP Baza Usług Rozwojowych" className="h-10 w-auto" width="73" height="40" />
      </div>
      <p className="font-heading text-lg font-bold leading-tight sm:text-xl">
        <span className="text-gradient">{pl ? 'Nawet 80% dofinansowania' : 'Up to 80% funding'}</span>
        {pl ? ' na nasze szkolenia i doradztwo AI' : ' for our AI training and consulting'}
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        {pl
          ? 'Jesteśmy w Bazie Usług Rozwojowych PARP. Firmy z sektora MŚP mogą sfinansować udział w naszych usługach ze środków regionalnych programów Fundusze Europejskie, przez operatora w swoim województwie. Wysokość wsparcia zależy od regionu i warunków programu. Pomożemy sprawdzić, ile możesz otrzymać.'
          : 'We are listed in the PARP Development Services Database (BUR). SMEs can finance our services from regional European Funds programmes through the operator in their region. The amount depends on the region and programme terms. We will help you check how much you can get.'}
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Link
          to="/contact#contact"
          onClick={close}
          className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          {pl ? 'Sprawdź dofinansowanie →' : 'Check funding →'}
        </Link>
        <Link
          to="/aktualnosci/wpis-do-bazy-uslug-rozwojowych"
          onClick={close}
          className="rounded-full border border-border px-5 py-2 text-sm text-foreground transition-colors hover:border-primary"
        >
          {pl ? 'Jak to działa' : 'How it works'}
        </Link>
      </div>
    </div>
  );
};

export default FundingNotice;
