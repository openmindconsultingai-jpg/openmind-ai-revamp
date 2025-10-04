import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, User, MessageSquare, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';

const getContactSchema = (language: 'pl' | 'en' | 'it') => z.object({
  name: z.string()
    .trim()
    .min(2, { message: language === 'pl' ? "Imię musi zawierać co najmniej 2 znaki" : language === 'en' ? "Name must be at least 2 characters" : "Il nome deve contenere almeno 2 caratteri" })
    .max(100, { message: language === 'pl' ? "Imię nie może przekraczać 100 znaków" : language === 'en' ? "Name cannot exceed 100 characters" : "Il nome non può superare 100 caratteri" }),
  email: z.string()
    .trim()
    .email({ message: language === 'pl' ? "Podaj poprawny adres email" : language === 'en' ? "Please provide a valid email address" : "Fornisci un indirizzo email valido" })
    .max(255, { message: language === 'pl' ? "Email nie może przekraczać 255 znaków" : language === 'en' ? "Email cannot exceed 255 characters" : "L'email non può superare 255 caratteri" }),
  message: z.string()
    .trim()
    .min(10, { message: language === 'pl' ? "Wiadomość musi zawierać co najmniej 10 znaków" : language === 'en' ? "Message must be at least 10 characters" : "Il messaggio deve contenere almeno 10 caratteri" })
    .max(1000, { message: language === 'pl' ? "Wiadomość nie może przekraczać 1000 znaków" : language === 'en' ? "Message cannot exceed 1000 characters" : "Il messaggio non può superare 1000 caratteri" }),
  privacy: z.boolean()
    .refine((val) => val === true, {
      message: language === 'pl' ? "Musisz zaakceptować politykę prywatności" : language === 'en' ? "You must accept the privacy policy" : "Devi accettare la politica sulla privacy"
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
      console.log("Wysyłanie wiadomości...", data);
      
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: data.name,
          email: data.email,
          message: data.message
        }
      });

      if (error) {
        console.error("Błąd wysyłania:", error);
        throw error;
      }
      
      toast({
        title: t('contact.form.success'),
        description: language === 'pl' ? "Skontaktujemy się z Tobą wkrótce." : language === 'en' ? "We'll get back to you soon." : "Ti contatteremo presto.",
      });
      
      reset();
    } catch (error) {
      console.error("Błąd:", error);
      toast({
        title: language === 'pl' ? "Błąd" : language === 'en' ? "Error" : "Errore",
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
    <div className="bg-card border border-border rounded-2xl p-8 md:p-10 hover:border-primary/50 transition-colors">
      <div className="mb-8">
        <h3 className="text-3xl font-bold mb-3 text-foreground">
          {language === 'pl' ? 'Wyślij wiadomość' : language === 'en' ? 'Send a Message' : 'Invia un Messaggio'}
        </h3>
        <p className="text-muted-foreground">
          {language === 'pl' ? 'Wypełnij formularz, a my skontaktujemy się z Tobą w ciągu 24 godzin' : language === 'en' ? 'Fill out the form and we\'ll get back to you within 24 hours' : 'Compila il modulo e ti contatteremo entro 24 ore'}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            {t('contact.form.name')}
          </label>
          <Input
            {...register('name')}
            placeholder={language === 'pl' ? "Jan Kowalski" : language === 'en' ? "John Doe" : "Mario Rossi"}
            className="bg-background border-border focus:border-primary"
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Mail className="w-4 h-4 text-primary" />
            {t('contact.form.email')}
          </label>
          <Input
            {...register('email')}
            type="email"
            placeholder={language === 'pl' ? "jan@przyklad.pl" : language === 'en' ? "john@example.com" : "mario@esempio.it"}
            className="bg-background border-border focus:border-primary"
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-primary" />
            {t('contact.form.message')}
          </label>
          <Textarea
            {...register('message')}
            placeholder={language === 'pl' ? "Opisz, jak możemy Ci pomóc..." : language === 'en' ? "Describe how we can help you..." : "Descrivi come possiamo aiutarti..."}
            rows={5}
            className="bg-background border-border focus:border-primary resize-none"
          />
          {errors.message && (
            <p className="text-sm text-destructive">{errors.message.message}</p>
          )}
        </div>

        <div className="flex items-start gap-3 pt-2">
          <Checkbox
            id="privacy"
            checked={privacyAccepted}
            onCheckedChange={(checked) => setValue('privacy', checked as boolean)}
            className="mt-1"
          />
          <label htmlFor="privacy" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
            {language === 'pl' ? 'Akceptuję' : language === 'en' ? 'I accept the' : 'Accetto la'}{' '}
            <button
              type="button"
              onClick={scrollToPrivacy}
              className="text-primary hover:underline font-medium"
            >
              {language === 'pl' ? 'politykę prywatności' : language === 'en' ? 'privacy policy' : 'politica sulla privacy'}
            </button>
            {' '}{language === 'pl' ? 'i wyrażam zgodę na przetwarzanie moich danych osobowych' : language === 'en' ? 'and agree to the processing of my personal data' : 'e acconsento al trattamento dei miei dati personali'}
          </label>
        </div>
        {errors.privacy && (
          <p className="text-sm text-destructive">{errors.privacy.message}</p>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          variant="glass"
          className="w-full font-semibold py-6 text-lg group"
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
