import { Shield, Lock, Eye, FileText } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Privacy = () => {
  const { t } = useLanguage();
  return (
    <section id="privacy" className="py-20 md:py-32 relative bg-card/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient">{t('privacy.title')}</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              {t('privacy.subtitle')}
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-background border border-border rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-foreground">
                    {t('privacy.admin.title')}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('privacy.admin.desc')}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-background border border-border rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Lock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-foreground">
                    {t('privacy.scope.title')}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {t('privacy.scope.desc')}
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>{t('privacy.scope.item1')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>{t('privacy.scope.item2')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>{t('privacy.scope.item3')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>{t('privacy.scope.item4')}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-background border border-border rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-foreground">
                    {t('privacy.legal.title')}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {t('privacy.legal.desc')}
                  </p>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>{t('privacy.legal.item1')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>{t('privacy.legal.item2')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>{t('privacy.legal.item3')}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-background border border-border rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                {t('privacy.rights.title')}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t('privacy.rights.desc')}
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-primary/5 rounded-lg">
                  <p className="font-semibold text-foreground mb-1">{t('privacy.rights.access')}</p>
                  <p className="text-sm text-muted-foreground">{t('privacy.rights.access.desc')}</p>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg">
                  <p className="font-semibold text-foreground mb-1">{t('privacy.rights.rectification')}</p>
                  <p className="text-sm text-muted-foreground">{t('privacy.rights.rectification.desc')}</p>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg">
                  <p className="font-semibold text-foreground mb-1">{t('privacy.rights.erasure')}</p>
                  <p className="text-sm text-muted-foreground">{t('privacy.rights.erasure.desc')}</p>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg">
                  <p className="font-semibold text-foreground mb-1">{t('privacy.rights.withdraw')}</p>
                  <p className="text-sm text-muted-foreground">{t('privacy.rights.withdraw.desc')}</p>
                </div>
              </div>
            </div>

            <div className="bg-background border border-border rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                {t('privacy.retention.title')}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('privacy.retention.desc')}
              </p>
            </div>

            <div className="bg-background border border-border rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                {t('privacy.datasecurity.title')}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('privacy.datasecurity.desc')}
              </p>
            </div>

            <div className="bg-primary/10 border border-primary/30 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-3 text-foreground">
                {t('privacy.questions.title')}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t('privacy.questions.desc')}
              </p>
              <a 
                href="mailto:biuro@openmind.pl" 
                className="text-primary hover:underline font-semibold text-lg"
              >
                biuro@openmind.pl
              </a>
            </div>

            <p className="text-sm text-muted-foreground text-center pt-8">
              {t('privacy.effective')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Privacy;
