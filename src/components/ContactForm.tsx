import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, User, MessageSquare, Send, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';

const getContactSchema = (language: 'pl' | 'en') => z.object({
  name: z.string()
    .trim()
    .min(2, { message: language === 'pl' ? "Imię musi zawierać co najmniej 2 znaki" : "Name must be at least 2 characters" })
    .max(100, { message: language === 'pl' ? "Imię nie może przekraczać 100 znaków" : "Name cannot exceed 100 characters" }),
  email: z.string()
    .trim()
    .email({ message: language === 'pl' ? "Podaj poprawny adres email" : "Please provide a valid email address" })
    .max(255, { message: language === 'pl' ? "Email nie może przekraczać 255 znaków" : "Email cannot exceed 255 characters" }),
  phone: z.string()
    .trim()
    .min(9, { message: language === 'pl' ? "Numer telefonu musi zawierać co najmniej 9 cyfr" : "Phone number must be at least 9 digits" })
    .max(20, { message: language === 'pl' ? "Numer telefonu nie może przekraczać 20 znaków" : "Phone number cannot exceed 20 characters" }),
  message: z.string()
    .trim()
    .min(10, { message: language === 'pl' ? "Wiadomość musi zawierać co najmniej 10 znaków" : "Message must be at least 10 characters" })
    .max(1000, { message: language === 'pl' ? "Wiadomość nie może przekraczać 1000 znaków" : "Message cannot exceed 1000 characters" }),
  privacy: z.boolean()
    .refine((val) => val === true, {
      message: language === 'pl' ? "Musisz zaakceptować politykę prywatności" : "You must accept the privacy policy"
    })
});

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { language, t } = useLanguage();
  
  const contactSchema = getContactSchema(language);
  type ContactFormData = z.infer<typeof contactSchema>;
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const privacyAccepted = watch('privacy');

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      console.log("Wysyłanie wiadomości...");
      
      // Wysłanie emaila
      const emailPromise = supabase.functions.invoke('send-contact-email', {
        body: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: data.message
        }
      });

      // Wysłanie do CRM przez proxy Edge Function
      const crmPromise = supabase.functions.invoke('forward-to-crm', {
        body: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: data.message
        }
      });

      const [emailResult, crmResult] = await Promise.all([emailPromise, crmPromise]);

      if (emailResult.error) {
        console.error("Błąd wysyłania emaila:", emailResult.error);
        throw emailResult.error;
      }

      if (crmResult.error) {
        console.error("Błąd wysyłania do CRM:", crmResult.error);
      }
      
      toast({
        title: t('contact.form.success'),
        description: language === 'pl' ? "Skontaktujemy się z Tobą wkrótce." : "We'll get back to you soon.",
      });
      
      reset();
    } catch (error) {
      console.error("Błąd:", error);
      toast({
        title: language === 'pl' ? "Błąd" : "Error",
        description: t('contact.form.error'),
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToPrivacy = () => {
    const element = document.getElementById('privacy');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-5 sm:p-8 md:p-10 hover:border-primary/50 transition-colors">
      <div className="mb-6 sm:mb-8">
        <h3 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 text-foreground">
          {language === 'pl' ? 'Wyślij wiadomość' : 'Send a Message'}
        </h3>
        <p className="text-sm sm:text-base text-muted-foreground">
          {language === 'pl' ? 'Wypełnij formularz, a my skontaktujemy się z Tobą w ciągu 24 godzin' : 'Fill out the form and we\'ll get back to you within 24 hours'}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
        <div className="space-y-1.5 sm:space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            {t('contact.form.name')}
          </label>
          <Input
            {...register('name')}
            placeholder={language === 'pl' ? "Jan Kowalski" : "John Doe"}
            className="bg-background border-border focus:border-primary"
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-1.5 sm:space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Mail className="w-4 h-4 text-primary" />
            {t('contact.form.email')}
          </label>
          <Input
            {...register('email')}
            type="email"
            placeholder={language === 'pl' ? "jan@przyklad.pl" : "john@example.com"}
            className="bg-background border-border focus:border-primary"
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1.5 sm:space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Phone className="w-4 h-4 text-primary" />
            {t('contact.form.phone')}
          </label>
          <Input
            {...register('phone')}
            type="tel"
            placeholder={language === 'pl' ? "+48 123 456 789" : "+1 234 567 890"}
            className="bg-background border-border focus:border-primary"
          />
          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-1.5 sm:space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-primary" />
            {t('contact.form.message')}
          </label>
          <Textarea
            {...register('message')}
            placeholder={language === 'pl' ? "Opisz, jak możemy Ci pomóc..." : "Describe how we can help you..."}
            rows={4}
            className="bg-background border-border focus:border-primary resize-none"
          />
          {errors.message && (
            <p className="text-sm text-destructive">{errors.message.message}</p>
          )}
        </div>

        <div className="flex items-start gap-3 pt-1 sm:pt-2">
          <Checkbox
            id="privacy"
            checked={privacyAccepted}
            onCheckedChange={(checked) => setValue('privacy', checked as boolean)}
            className="mt-0.5"
          />
          <label htmlFor="privacy" className="text-xs sm:text-sm text-muted-foreground leading-relaxed cursor-pointer">
            {language === 'pl' ? 'Akceptuję' : 'I accept the'}{' '}
            <button
              type="button"
              onClick={scrollToPrivacy}
              className="text-primary hover:underline font-medium"
            >
              {language === 'pl' ? 'politykę prywatności' : 'privacy policy'}
            </button>
            {' '}{language === 'pl' ? 'i wyrażam zgodę na przetwarzanie moich danych osobowych' : 'and agree to the processing of my personal data'}
          </label>
        </div>
        {errors.privacy && (
          <p className="text-sm text-destructive">{errors.privacy.message}</p>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          variant="glass"
          className="w-full font-semibold py-5 sm:py-6 text-base sm:text-lg group"
        >
          {isSubmitting ? (
            t('contact.form.sending')
          ) : (
            <>
              {t('contact.form.submit')}
              <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
