import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30"
];

const MAX_BOOKINGS_PER_DAY = 16;

// Input validation
function validateInput(data: any): { valid: boolean; error?: string } {
  if (!data || typeof data !== 'object') return { valid: false, error: "Invalid request" };
  
  const validActions = ['get_day_slots', 'check_availability'];
  if (!data.action || !validActions.includes(data.action)) {
    return { valid: false, error: 'Invalid action' };
  }

  if (data.date && (typeof data.date !== 'string' || !data.date.match(/^\d{4}-\d{2}-\d{2}$/))) {
    return { valid: false, error: 'Invalid date format (expected YYYY-MM-DD)' };
  }

  if (data.time && (typeof data.time !== 'string' || !data.time.match(/^\d{2}:\d{2}$/))) {
    return { valid: false, error: 'Invalid time format (expected HH:MM)' };
  }

  return { valid: true };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data = await req.json();
    
    // Validate input
    const validation = validateInput(data);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { action, date, time } = data;
    console.log('Booking availability - action:', action);

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    if (action === 'get_day_slots') {
      if (!date) {
        return new Response(
          JSON.stringify({ error: 'Date is required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

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
        JSON.stringify({ slots, bookedCount, availableCount, isDayFull }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

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

      return new Response(
        JSON.stringify({ available: !existingBooking }),
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
