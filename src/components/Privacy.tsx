import { Shield, Lock, Eye, FileText } from 'lucide-react';

const Privacy = () => {
  return (
    <section id="privacy" className="py-20 md:py-32 relative bg-card/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient">Polityka Prywatności</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Twoje dane są bezpieczne. Zobowiązujemy się do ochrony Twojej prywatności.
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
                    1. Administrator danych
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Administratorem danych osobowych jest OpenMind AI Consulting z siedzibą w Polsce. 
                    Kontakt z administratorem możliwy jest pod adresem email: biuro@openmind.pl
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
                    2. Zakres przetwarzania danych
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Przetwarzamy następujące dane osobowe:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>Imię i nazwisko - w celu identyfikacji klienta i personalizacji komunikacji</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>Adres email - w celu komunikacji i odpowiedzi na zapytania</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>Numer telefonu - opcjonalnie, w celu kontaktu telefonicznego</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>Treść wiadomości - zawartość zapytań i komunikacji z klientem</span>
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
                    3. Podstawa prawna i cel przetwarzania
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Dane osobowe przetwarzane są na podstawie:
                  </p>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>
                        <strong className="text-foreground">Art. 6 ust. 1 lit. a RODO</strong> - zgoda na przetwarzanie danych w celu kontaktu i świadczenia usług
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>
                        <strong className="text-foreground">Art. 6 ust. 1 lit. b RODO</strong> - wykonanie umowy lub podjęcie działań przed zawarciem umowy
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>
                        <strong className="text-foreground">Art. 6 ust. 1 lit. f RODO</strong> - prawnie uzasadniony interes administratora w postaci marketingu produktów i usług
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-background border border-border rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                4. Twoje prawa
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Zgodnie z RODO przysługują Ci następujące prawa:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-primary/5 rounded-lg">
                  <p className="font-semibold text-foreground mb-1">Prawo dostępu</p>
                  <p className="text-sm text-muted-foreground">Do swoich danych osobowych</p>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg">
                  <p className="font-semibold text-foreground mb-1">Prawo sprostowania</p>
                  <p className="text-sm text-muted-foreground">Poprawiania nieprawidłowych danych</p>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg">
                  <p className="font-semibold text-foreground mb-1">Prawo usunięcia</p>
                  <p className="text-sm text-muted-foreground">Danych osobowych</p>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg">
                  <p className="font-semibold text-foreground mb-1">Prawo do cofnięcia zgody</p>
                  <p className="text-sm text-muted-foreground">W dowolnym momencie</p>
                </div>
              </div>
            </div>

            <div className="bg-background border border-border rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                5. Okres przechowywania danych
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Dane osobowe będą przechowywane przez okres niezbędny do realizacji celów, 
                w jakich zostały zebrane, lub do momentu wycofania zgody. W przypadku umów 
                i dokumentów księgowych - zgodnie z przepisami prawa (minimum 5 lat).
              </p>
            </div>

            <div className="bg-background border border-border rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                6. Bezpieczeństwo danych
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Stosujemy odpowiednie środki techniczne i organizacyjne zapewniające bezpieczeństwo 
                przetwarzanych danych osobowych, w tym ochronę przed ich nieprawidłowym przetwarzaniem, 
                utratą, uszkodzeniem lub zniszczeniem.
              </p>
            </div>

            <div className="bg-primary/10 border border-primary/30 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-3 text-foreground">
                Pytania dotyczące polityki prywatności?
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                W przypadku pytań dotyczących przetwarzania danych osobowych, skontaktuj się z nami:
              </p>
              <a 
                href="mailto:biuro@openmind.pl" 
                className="text-primary hover:underline font-semibold text-lg"
              >
                biuro@openmind.pl
              </a>
            </div>

            <p className="text-sm text-muted-foreground text-center pt-8">
              Polityka prywatności obowiązuje od: 03.10.2025
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Privacy;
