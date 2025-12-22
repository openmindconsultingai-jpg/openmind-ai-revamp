import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Calendar, Clock, User, Mail, Phone, MessageSquare, ChevronLeft, ChevronRight, Check, Loader2, Shield } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TimeSlot {
  time: string;
  isAvailable: boolean;
}

const getBookingSchema = (language: 'pl' | 'en') => z.object({
  clientName: z.string().min(2, language === 'pl' ? 'Imię musi mieć min. 2 znaki' : 'Name must be at least 2 characters'),
  clientEmail: z.string().email(language === 'pl' ? 'Nieprawidłowy adres email' : 'Invalid email address'),
  clientPhone: z.string().min(9, language === 'pl' ? 'Nieprawidłowy numer telefonu' : 'Invalid phone number'),
  notes: z.string().optional(),
  privacyConsent: z.boolean().refine(val => val === true, {
    message: language === 'pl' ? 'Wymagana zgoda na przetwarzanie danych' : 'Privacy consent is required',
  }),
});

type BookingFormData = z.infer<ReturnType<typeof getBookingSchema>>;

const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  const { language, t } = useLanguage();
  const { toast } = useToast();
  
  const [step, setStep] = useState<'date' | 'time' | 'form' | 'success'>('date');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BookingFormData>({
    resolver: zodResolver(getBookingSchema(language)),
    defaultValues: {
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      notes: '',
      privacyConsent: false,
    },
  });

  // Pobierz dostępne sloty dla wybranej daty
  const fetchTimeSlots = useCallback(async (date: Date) => {
    setIsLoadingSlots(true);
    const dateStr = date.toISOString().split('T')[0];
    
    try {
      const { data, error } = await supabase.functions.invoke('booking-availability', {
        body: { action: 'get_day_slots', date: dateStr },
      });

      if (error) throw error;
      
      setTimeSlots(data.slots || []);
    } catch (error) {
      console.error('Error fetching slots:', error);
      setTimeSlots([]);
    } finally {
      setIsLoadingSlots(false);
    }
  }, []);

  // Efekt dla pobierania slotów przy zmianie daty
  useEffect(() => {
    if (selectedDate && step === 'time') {
      fetchTimeSlots(selectedDate);
    }
  }, [selectedDate, step, fetchTimeSlots]);

  // Reset przy zamknięciu
  useEffect(() => {
    if (!isOpen) {
      setStep('date');
      setSelectedDate(null);
      setSelectedTime(null);
      setTimeSlots([]);
      form.reset();
    }
  }, [isOpen, form]);

  // Generowanie dni kalendarza
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // Poniedziałek = 0
    
    const days: (Date | null)[] = [];
    
    // Puste miejsca przed pierwszym dniem
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    
    // Dni miesiąca
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Przeszłe daty
    if (date < today) return true;
    
    // Weekendy (sobota = 6, niedziela = 0)
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) return true;
    
    return false;
  };

  const handleDateSelect = (date: Date) => {
    if (isDateDisabled(date)) return;
    setSelectedDate(date);
    setStep('time');
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep('form');
  };

  const onSubmit = async (data: BookingFormData) => {
    if (!selectedDate || !selectedTime) return;
    
    setIsSubmitting(true);
    const dateStr = selectedDate.toISOString().split('T')[0];
    
    try {
      // Sprawdź rate limit
      const { data: rateLimitData, error: rateLimitError } = await supabase.functions.invoke('check-booking-rate-limit', {
        body: { clientEmail: data.clientEmail },
      });

      if (rateLimitError) throw rateLimitError;
      
      if (!rateLimitData.allowed) {
        toast({
          title: language === 'pl' ? 'Limit przekroczony' : 'Limit exceeded',
          description: rateLimitData.message,
          variant: 'destructive',
        });
        setIsSubmitting(false);
        return;
      }

      // Sprawdź dostępność slotu (double-check)
      const { data: availabilityData, error: availabilityError } = await supabase.functions.invoke('booking-availability', {
        body: { action: 'check_availability', date: dateStr, time: selectedTime },
      });

      if (availabilityError) throw availabilityError;
      
      if (!availabilityData.available) {
        toast({
          title: language === 'pl' ? 'Termin zajęty' : 'Slot taken',
          description: language === 'pl' 
            ? 'Ten termin został właśnie zarezerwowany. Wybierz inny.' 
            : 'This slot was just booked. Please choose another.',
          variant: 'destructive',
        });
        setStep('time');
        fetchTimeSlots(selectedDate);
        setIsSubmitting(false);
        return;
      }

      // Zapisz rezerwację w bazie
      const { error: insertError } = await supabase
        .from('bookings')
        .insert({
          client_name: data.clientName,
          client_email: data.clientEmail,
          client_phone: data.clientPhone,
          booking_date: dateStr,
          booking_time: selectedTime,
          notes: data.notes || null,
          status: 'confirmed',
        });

      if (insertError) throw insertError;

      // Wyślij potwierdzenie email
      const { error: emailError } = await supabase.functions.invoke('send-booking-confirmation', {
        body: {
          clientName: data.clientName,
          clientEmail: data.clientEmail,
          clientPhone: data.clientPhone,
          bookingDate: dateStr,
          bookingTime: selectedTime,
          notes: data.notes,
        },
      });

      if (emailError) {
        console.error('Email error:', emailError);
        // Kontynuuj mimo błędu email
      }

      setStep('success');
      
    } catch (error) {
      console.error('Booking error:', error);
      toast({
        title: language === 'pl' ? 'Błąd' : 'Error',
        description: language === 'pl' 
          ? 'Wystąpił błąd podczas rezerwacji. Spróbuj ponownie.' 
          : 'An error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDateDisplay = (date: Date) => {
    return date.toLocaleDateString(language === 'pl' ? 'pl-PL' : 'en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const monthNames = language === 'pl' 
    ? ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień']
    : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const dayNames = language === 'pl' 
    ? ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb', 'Nd']
    : ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" />
      
      {/* Modal */}
      <div 
        className="relative w-full max-w-lg glass rounded-3xl overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/50 hover:bg-muted/50 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="p-6 border-b border-border/30">
          <h3 className="font-heading text-xl md:text-2xl text-gradient font-semibold">
            {language === 'pl' ? 'Zarezerwuj bezpłatną konsultację' : 'Book a free consultation'}
          </h3>
          <p className="text-muted-foreground text-sm mt-1">
            {language === 'pl' ? '30 minut rozmowy o Twoich potrzebach AI' : '30 minutes to discuss your AI needs'}
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          
          {/* Step: Date Selection */}
          {step === 'date' && (
            <div>
              {/* Month navigation */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                  className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  disabled={currentMonth <= new Date()}
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="font-medium">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </span>
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                  className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Day names */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map((day) => (
                  <div key={day} className="text-center text-xs text-muted-foreground py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar days */}
              <div className="grid grid-cols-7 gap-1">
                {getDaysInMonth(currentMonth).map((date, index) => (
                  <button
                    key={index}
                    onClick={() => date && handleDateSelect(date)}
                    disabled={!date || isDateDisabled(date)}
                    className={`
                      aspect-square rounded-lg text-sm transition-all
                      ${!date ? 'invisible' : ''}
                      ${date && isDateDisabled(date) 
                        ? 'text-muted-foreground/30 cursor-not-allowed' 
                        : 'hover:bg-primary/20 hover:text-primary cursor-pointer'}
                      ${date && selectedDate?.toDateString() === date.toDateString() 
                        ? 'bg-primary text-primary-foreground' 
                        : ''}
                    `}
                  >
                    {date?.getDate()}
                  </button>
                ))}
              </div>

              <p className="text-xs text-muted-foreground mt-4 text-center">
                {language === 'pl' 
                  ? 'Dostępne: poniedziałek - piątek, 9:00 - 17:00' 
                  : 'Available: Monday - Friday, 9:00 AM - 5:00 PM'}
              </p>
            </div>
          )}

          {/* Step: Time Selection */}
          {step === 'time' && selectedDate && (
            <div>
              <button
                onClick={() => setStep('date')}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
              >
                <ChevronLeft size={16} />
                {language === 'pl' ? 'Zmień datę' : 'Change date'}
              </button>

              <div className="flex items-center gap-2 mb-4 p-3 rounded-lg bg-primary/10 border border-primary/20">
                <Calendar size={18} className="text-primary" />
                <span className="font-medium">{formatDateDisplay(selectedDate)}</span>
              </div>

              <h4 className="font-medium mb-3">
                {language === 'pl' ? 'Wybierz godzinę:' : 'Select time:'}
              </h4>

              {isLoadingSlots ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="animate-spin text-primary" size={32} />
                </div>
              ) : (
                <div className="max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.time}
                        onClick={() => slot.isAvailable && handleTimeSelect(slot.time)}
                        disabled={!slot.isAvailable}
                        className={`
                          py-2.5 rounded-lg text-sm font-medium transition-all
                          ${slot.isAvailable 
                            ? 'bg-muted/50 hover:bg-primary/20 hover:text-primary border border-transparent hover:border-primary/30' 
                            : 'bg-muted/20 text-muted-foreground/30 cursor-not-allowed line-through'}
                        `}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {!isLoadingSlots && timeSlots.filter(s => s.isAvailable).length === 0 && (
                <p className="text-center text-muted-foreground py-4">
                  {language === 'pl' 
                    ? 'Brak dostępnych terminów w tym dniu. Wybierz inny dzień.' 
                    : 'No available slots for this day. Please choose another day.'}
                </p>
              )}
            </div>
          )}

          {/* Step: Form */}
          {step === 'form' && selectedDate && selectedTime && (
            <div>
              <button
                onClick={() => setStep('time')}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
              >
                <ChevronLeft size={16} />
                {language === 'pl' ? 'Zmień godzinę' : 'Change time'}
              </button>

              <div className="flex flex-wrap gap-2 mb-6">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20">
                  <Calendar size={16} className="text-primary" />
                  <span className="text-sm">{formatDateDisplay(selectedDate)}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20">
                  <Clock size={16} className="text-primary" />
                  <span className="text-sm">{selectedTime}</span>
                </div>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="clientName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <User size={14} />
                          {language === 'pl' ? 'Imię i nazwisko' : 'Full name'}
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder={language === 'pl' ? 'Jan Kowalski' : 'John Smith'} 
                            className="bg-background/50 border-border/50"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="clientEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Mail size={14} />
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder="jan@example.com" 
                            className="bg-background/50 border-border/50"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="clientPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Phone size={14} />
                          {language === 'pl' ? 'Telefon' : 'Phone'}
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="tel"
                            placeholder="+48 123 456 789" 
                            className="bg-background/50 border-border/50"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <MessageSquare size={14} />
                          {language === 'pl' ? 'Uwagi (opcjonalnie)' : 'Notes (optional)'}
                        </FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder={language === 'pl' 
                              ? 'O czym chciałbyś porozmawiać?' 
                              : 'What would you like to discuss?'} 
                            className="bg-background/50 border-border/50 resize-none"
                            rows={3}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Privacy consent - RODO */}
                  <FormField
                    control={form.control}
                    name="privacyConsent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-border/50 p-4 bg-background/30">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-normal cursor-pointer">
                            <Shield size={12} className="inline mr-1 text-primary" />
                            {language === 'pl' 
                              ? 'Wyrażam zgodę na przetwarzanie moich danych osobowych w celu realizacji rezerwacji zgodnie z ' 
                              : 'I consent to the processing of my personal data for the booking purpose in accordance with the '}
                            <a 
                              href="/privacy" 
                              target="_blank" 
                              className="text-primary hover:underline"
                            >
                              {language === 'pl' ? 'Polityką Prywatności' : 'Privacy Policy'}
                            </a>
                            {language === 'pl' ? ' oraz RODO.' : ' and GDPR.'}
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {language === 'pl' ? 'Rezerwuję...' : 'Booking...'}
                      </>
                    ) : (
                      language === 'pl' ? 'Zarezerwuj konsultację' : 'Book consultation'
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          )}

          {/* Step: Success */}
          {step === 'success' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-primary" />
              </div>
              <h4 className="font-heading text-xl font-semibold mb-2">
                {language === 'pl' ? 'Rezerwacja potwierdzona!' : 'Booking confirmed!'}
              </h4>
              <p className="text-muted-foreground mb-6">
                {language === 'pl' 
                  ? 'Wysłaliśmy potwierdzenie na Twój adres email. Do zobaczenia!' 
                  : 'We sent a confirmation to your email. See you soon!'}
              </p>
              <Button onClick={onClose} variant="outline">
                {language === 'pl' ? 'Zamknij' : 'Close'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
