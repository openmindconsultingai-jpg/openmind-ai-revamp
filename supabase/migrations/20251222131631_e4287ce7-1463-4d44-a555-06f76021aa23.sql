-- ============================================
-- Tabela rezerwacji konsultacji (bez cen - zawsze darmowe)
-- ============================================
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  status TEXT NOT NULL DEFAULT 'confirmed',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Włącz RLS
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Indeks dla szybszych zapytań
CREATE INDEX idx_bookings_date_time ON public.bookings(booking_date, booking_time);

-- Unikalny indeks zapobiegający podwójnym rezerwacjom
CREATE UNIQUE INDEX idx_unique_active_booking 
ON public.bookings (booking_date, booking_time) 
WHERE status != 'cancelled';

-- Funkcja aktualizacji timestamps
CREATE OR REPLACE FUNCTION public.update_bookings_updated_at()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Trigger automatycznej aktualizacji
CREATE TRIGGER update_bookings_timestamp
BEFORE UPDATE ON public.bookings
FOR EACH ROW
EXECUTE FUNCTION public.update_bookings_updated_at();

-- Polityki RLS - publiczny dostęp (bez autentykacji)
CREATE POLICY "Anyone can read bookings" 
ON public.bookings FOR SELECT TO public USING (true);

CREATE POLICY "Anyone can create bookings"
ON public.bookings FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Anyone can update bookings" 
ON public.bookings FOR UPDATE TO public USING (true) WITH CHECK (true);

-- ============================================
-- Tabela rate limiting
-- ============================================
CREATE TABLE public.booking_rate_limits (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    client_identifier TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.booking_rate_limits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create rate limit records"
ON public.booking_rate_limits FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can read rate limit records"
ON public.booking_rate_limits FOR SELECT USING (true);

CREATE INDEX idx_booking_rate_limits_identifier_time 
ON public.booking_rate_limits (client_identifier, created_at DESC);

-- Auto-cleanup starych rekordów
CREATE OR REPLACE FUNCTION public.cleanup_old_rate_limits()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.booking_rate_limits 
  WHERE created_at < now() - interval '24 hours';
  RETURN NEW;
END;
$$;

CREATE TRIGGER cleanup_rate_limits_trigger
AFTER INSERT ON public.booking_rate_limits
FOR EACH STATEMENT
EXECUTE FUNCTION public.cleanup_old_rate_limits();