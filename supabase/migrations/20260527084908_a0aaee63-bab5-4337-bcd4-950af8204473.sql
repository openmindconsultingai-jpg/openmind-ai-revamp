
-- 1) Bookings: drop overly-permissive INSERT policy; only service role (edge functions) can write
DROP POLICY IF EXISTS "Anyone can create bookings" ON public.bookings;
REVOKE INSERT ON public.bookings FROM anon, authenticated;

-- 2) Lock down SECURITY DEFINER trigger helpers — they should only run via triggers, never directly via API
REVOKE EXECUTE ON FUNCTION public.update_bookings_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.cleanup_old_rate_limits() FROM PUBLIC, anon, authenticated;
