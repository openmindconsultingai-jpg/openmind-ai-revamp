import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  getFundingBannerCopy,
  type FundingBannerCity,
} from '@/lib/fundingBanner';
import { noWidows } from '@/lib/typography';
import burLogo from '@/assets/parp-bur-light.png.asset.json';

interface BurFundingBannerProps {
  city?: FundingBannerCity;
}

const BurFundingBanner = ({ city }: BurFundingBannerProps) => {
  const { language } = useLanguage();
  const copy = getFundingBannerCopy(language, city);

  return (
    <aside
      aria-label={copy.ariaLabel}
      data-funding-banner
      className="container mx-auto mb-8 max-w-6xl px-4 sm:px-6"
    >
      <div className="grid gap-4 rounded-md border border-primary/30 bg-card/95 p-4 sm:p-5 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-center lg:gap-5 xl:grid-cols-[auto_minmax(0,1fr)_auto] xl:p-4">
        <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-2">
          <img
            src={burLogo.url}
            alt="PARP – Baza Usług Rozwojowych"
            className="h-14 w-auto shrink-0 object-contain sm:h-16"
            width="116"
            height="64"
            loading="eager"
            decoding="async"
          />
          <p className="font-mono text-[9px] uppercase leading-relaxed tracking-[0.08em] text-primary">
            {copy.label}
          </p>
        </div>

        <div className="min-w-0">
          <h2 className="font-heading text-xl font-medium leading-tight text-foreground sm:text-2xl xl:text-[1.35rem]">
            {copy.heading}
          </h2>
          <p
            lang={language}
            className="mt-2 font-sans text-sm leading-relaxed text-muted-foreground xl:text-xs xl:leading-[1.45]"
            style={{ textAlign: 'left', hyphens: 'auto' }}
          >
            {noWidows(copy.body)}
          </p>
        </div>

        <div className="flex flex-col gap-2 min-[420px]:flex-row lg:col-span-2 xl:col-span-1 xl:w-40 xl:flex-col">
          <Link
            to="/contact"
            className="fx-button px-4 py-2 text-center font-sans text-xs whitespace-nowrap"
          >
            {copy.primaryCta}
          </Link>
          <Link
            to="/aktualnosci/wpis-do-bazy-uslug-rozwojowych"
            className="fx-button-outline px-4 py-2 text-center font-sans text-xs whitespace-nowrap text-foreground"
          >
            {copy.secondaryCta}
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default BurFundingBanner;
