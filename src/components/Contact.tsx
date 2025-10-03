import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient">Kontakt</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Gotowy na rozmowę o przyszłości? Skontaktuj się z nami.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-2xl p-8 text-center hover:border-primary/50 transition-colors">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Email</h3>
              <a href="mailto:kontakt@openmindai.pl" className="text-primary hover:underline">
                kontakt@openmindai.pl
              </a>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 text-center hover:border-primary/50 transition-colors">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Telefon</h3>
              <a href="tel:+48123456789" className="text-primary hover:underline">
                +48 123 456 789
              </a>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 text-center hover:border-primary/50 transition-colors">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Lokalizacja</h3>
              <p className="text-muted-foreground">
                Polska
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
