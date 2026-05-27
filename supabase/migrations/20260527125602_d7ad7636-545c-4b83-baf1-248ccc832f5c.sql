-- Re-enable safe public INSERT into bookings so the published site keeps working.
-- Reads / updates / deletes remain server-only (service_role).

GRANT INSERT ON public.bookings TO anon;
GRANT INSERT ON public.bookings TO authenticated;

DROP POLICY IF EXISTS "Public can insert bookings with constraints" ON public.bookings;

CREATE POLICY "Public can insert bookings with constraints"
ON public.bookings
FOR INSERT
TO anon, authenticated
WITH CHECK (
  -- name
  client_name IS NOT NULL
  AND length(btrim(client_name)) BETWEEN 2 AND 100
  -- email
  AND client_email IS NOT NULL
  AND length(client_email) BETWEEN 5 AND 255
  AND client_email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  -- phone
  AND client_phone IS NOT NULL
  AND length(btrim(client_phone)) BETWEEN 9 AND 20
  -- date / time
  AND booking_date IS NOT NULL
  AND booking_date >= current_date
  AND extract(dow from booking_date) NOT IN (0, 6)         -- no weekends
  AND booking_time IS NOT NULL
  AND booking_time BETWEEN time '09:00' AND time '16:30'
  -- notes
  AND (notes IS NULL OR length(notes) <= 1000)
  -- forced status
  AND status = 'confirmed'
);