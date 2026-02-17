import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Sloty 30-minutowe: 9:00 - 17:00 (ostatni slot o 16:30)
const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30"
];

const MAX_BOOKINGS_PER_DAY = 16;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, date, time } = await req.json();
    
    console.log('Booking availability - action:', action, 'date:', date, 'time:', time);
    
    const validActions = ['get_day_slots', 'check_availability'];
    if (!action || !validActions.includes(action)) {
      return new Response(
        JSON.stringify({ error: 'Invalid action. Valid: ' + validActions.join(', ') }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // ====== ACTION: get_day_slots ======
    if (action === 'get_day_slots') {
      if (!date) {
        return new Response(
          JSON.stringify({ error: 'Date is required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Pobierz zajęte sloty z bazy danych
      const { data: bookings, error } = await supabase
        .from('bookings')
        .select('booking_time')
        .eq('booking_date', date)
        .neq('status', 'cancelled');

      if (error) {
        console.error('Database error:', error);
        return new Response(
          JSON.stringify({ error: 'Database error' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const busySlots = new Set<string>();
      if (bookings) {
        for (const booking of bookings) {
          if (booking.booking_time) {
            const time = booking.booking_time.substring(0, 5);
            busySlots.add(time);
          }
        }
      }

      const bookedCount = busySlots.size;
      const isDayFull = bookedCount >= MAX_BOOKINGS_PER_DAY;

      const slots = TIME_SLOTS.map(time => ({
        time,
        isAvailable: !busySlots.has(time) && !isDayFull,
      }));

      const availableCount = slots.filter(s => s.isAvailable).length;

      return new Response(
        JSON.stringify({ 
          slots,
          bookedCount,
          availableCount,
          isDayFull,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // ====== ACTION: check_availability ======
    if (action === 'check_availability') {
      if (!date || !time) {
        return new Response(
          JSON.stringify({ error: 'Date and time are required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const { data: existingBooking, error } = await supabase
        .from('bookings')
        .select('id')
        .eq('booking_date', date)
        .eq('booking_time', time)
        .neq('status', 'cancelled')
        .maybeSingle();

      if (error) {
        console.error('Database error:', error);
        return new Response(
          JSON.stringify({ error: 'Database error' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const available = !existingBooking;

      return new Response(
        JSON.stringify({ available }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Unable to process request' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
