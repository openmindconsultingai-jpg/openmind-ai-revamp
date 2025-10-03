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

const contactSchema = z.object({
  name: z.string()
    .trim()
    .min(2, { message: "Imię musi zawierać co najmniej 2 znaki" })
    .max(100, { message: "Imię nie może przekraczać 100 znaków" }),
  email: z.string()
    .trim()
    .email({ message: "Podaj poprawny adres email" })
    .max(255, { message: "Email nie może przekraczać 255 znaków" }),
  message: z.string()
    .trim()
    .min(10, { message: "Wiadomość musi zawierać co najmniej 10 znaków" })
    .max(1000, { message: "Wiadomość nie może przekraczać 1000 znaków" }),
  privacy: z.boolean()
    .refine((val) => val === true, {
      message: "Musisz zaakceptować politykę prywatności"
    })
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
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
      // Enkodowanie danych dla mailto
      const subject = encodeURIComponent(`Wiadomość od ${data.name}`);
      const body = encodeURIComponent(
        `Imię: ${data.name}\nEmail: ${data.email}\n\nWiadomość:\n${data.message}`
      );
      
      // Otwórz klienta email
      window.location.href = `mailto:openmindconsultingai@gmail.com?subject=${subject}&body=${body}`;
      
      toast({
        title: "Otwieranie klienta email",
        description: "Twoja wiadomość została przygotowana do wysłania.",
      });
      
      reset();
    } catch (error) {
      toast({
        title: "Błąd",
        description: "Nie udało się otworzyć klienta email. Spróbuj ponownie.",
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
        <h3 className="text-3xl font-bold mb-3 text-foreground">Wyślij wiadomość</h3>
        <p className="text-muted-foreground">
          Wypełnij formularz, a my skontaktujemy się z Tobą w ciągu 24 godzin
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            Imię i nazwisko
          </label>
          <Input
            {...register('name')}
            placeholder="Jan Kowalski"
            className="bg-background border-border focus:border-primary"
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Mail className="w-4 h-4 text-primary" />
            Adres email
          </label>
          <Input
            {...register('email')}
            type="email"
            placeholder="jan@przyklad.pl"
            className="bg-background border-border focus:border-primary"
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-primary" />
            Wiadomość
          </label>
          <Textarea
            {...register('message')}
            placeholder="Opisz, jak możemy Ci pomóc..."
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
            Akceptuję{' '}
            <button
              type="button"
              onClick={scrollToPrivacy}
              className="text-primary hover:underline font-medium"
            >
              politykę prywatności
            </button>
            {' '}i wyrażam zgodę na przetwarzanie moich danych osobowych
          </label>
        </div>
        {errors.privacy && (
          <p className="text-sm text-destructive">{errors.privacy.message}</p>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity font-semibold py-6 text-lg group"
        >
          {isSubmitting ? (
            "Wysyłanie..."
          ) : (
            <>
              Wyślij wiadomość
              <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
