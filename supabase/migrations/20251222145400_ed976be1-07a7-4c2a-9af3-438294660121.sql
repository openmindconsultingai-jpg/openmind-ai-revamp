-- Drop overly permissive RLS policies on bookings table
DROP POLICY IF EXISTS "Anyone can read bookings" ON public.bookings;
DROP POLICY IF EXISTS "Anyone can update bookings" ON public.bookings;

-- Bookings should only be created by public forms, but read/update only by service role
-- INSERT policy remains public for booking form
-- SELECT and UPDATE removed - only accessible via Edge Functions with service role

-- Clean up rate limits policies too - these are internal
DROP POLICY IF EXISTS "Anyone can read rate limit records" ON public.booking_rate_limits;

-- Add proper policy - rate limit records should not be publicly readable
CREATE POLICY "Rate limit records are internal only" 
ON public.booking_rate_limits 
FOR SELECT 
USING (false);