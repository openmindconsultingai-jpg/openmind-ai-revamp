import { Mail, Phone, MapPin } from 'lucide-react';
import ContactForm from './ContactForm';
import logo from '@/assets/openmind-logo.webp';

const Contact = () => {
  return (
    <section id="contact" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <img src={logo} alt="OpenMind AI" className="h-16 opacity-80" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient">Kontakt</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Gotowy na rozmowę o przyszłości? Skontaktuj się z nami już dziś
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-foreground">Email</h3>
                    <a href="mailto:biuro@openmind.pl" className="text-primary hover:underline text-lg">
                      biuro@openmind.pl
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-foreground">Telefon</h3>
                    <a href="tel:+48693016974" className="text-primary hover:underline text-lg">
                      +48 693 016 974
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-foreground">Lokalizacja</h3>
                    <p className="text-muted-foreground text-lg">
                      Polska
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-foreground">Godziny pracy</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>Poniedziałek - Piątek: 9:00 - 17:00</p>
                  <p>Sobota - Niedziela: Zamknięte</p>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
