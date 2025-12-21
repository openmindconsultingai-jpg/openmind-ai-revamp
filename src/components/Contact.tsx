import { useEffect, useRef } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import ContactForm from './ContactForm';
import logo from '@/assets/openmind-logo.webp';
import VideoSectionBackground from '@/components/VideoSectionBackground';
import { useLanguage } from '@/contexts/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Contact info cards animation
      gsap.fromTo(
        '.contact-card',
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: infoRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Form animation
      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: 60, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Background parallax (was image-based)
      // Video background is handled by VideoSectionBackground.
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="pt-20 md:pt-24 pb-20 md:pb-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <VideoSectionBackground opacity={0.6} blurPx={3} overlayOpacity={0.45} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/25 to-background" />
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div ref={headerRef} className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <img src={logo} alt="OpenMind AI" className="h-16 opacity-80" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient text-glow">{t('contact.title')}</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              {t('contact.subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div ref={infoRef} className="space-y-8">
              <div className="space-y-6">
                <div className="contact-card flex items-start gap-3 sm:gap-4 p-4 sm:p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base sm:text-lg font-semibold mb-1 text-foreground text-glow-subtle">{t('contact.email')}</h3>
                    <a href="mailto:biuro@openmindai.pl" className="text-primary hover:underline text-sm sm:text-lg break-all">
                      biuro@openmindai.pl
                    </a>
                  </div>
                </div>

                <div className="contact-card flex items-start gap-3 sm:gap-4 p-4 sm:p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base sm:text-lg font-semibold mb-1 text-foreground text-glow-subtle">{t('contact.phone')}</h3>
                    <a href="tel:+48693016974" className="text-primary hover:underline text-sm sm:text-lg">
                      +48 693 016 974
                    </a>
                  </div>
                </div>

                <div className="contact-card flex items-start gap-3 sm:gap-4 p-4 sm:p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base sm:text-lg font-semibold mb-1 text-foreground text-glow-subtle">{t('contact.location')}</h3>
                    <p className="text-muted-foreground text-sm sm:text-lg">
                      {t('contact.locationValue')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="contact-card bg-primary/5 border border-primary/20 rounded-xl p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold mb-3 text-foreground text-glow-subtle">{t('contact.hours')}</h3>
                <div className="space-y-2 text-muted-foreground text-sm sm:text-base">
                  <p>{t('contact.hours.weekdays')}</p>
                  <p>{t('contact.hours.weekend')}</p>
                </div>
              </div>
            </div>

            <div ref={formRef}>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
