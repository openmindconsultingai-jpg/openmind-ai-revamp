import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Dane OpenMind AI Consulting
const OWNER_EMAIL = "biuro@openmind.biz.pl";
const COMPANY_NAME = "OpenMind AI Consulting";
const SENDER_EMAIL = "rezerwacje@openmind.biz.pl";

function escapeHtml(text: string): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

interface BookingConfirmationRequest {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  bookingDate: string;
  bookingTime: string;
  notes?: string;
}

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('pl-PL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const generateClientEmailHtml = (booking: BookingConfirmationRequest): string => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Potwierdzenie konsultacji - ${COMPANY_NAME}</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', 'Segoe UI', Arial, sans-serif; background: linear-gradient(135deg, #0a0f14 0%, #0d1117 100%); color: #e5f7f7;">
  <table width="100%" cellpadding="0" cellspacing="0" style="min-height: 100vh; background: linear-gradient(135deg, #0a0f14 0%, #0d1117 100%);">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">
          
          <!-- Header -->
          <tr>
            <td style="text-align: center; padding-bottom: 30px;">
              <div style="display: inline-block; padding: 15px 30px; background: linear-gradient(135deg, rgba(0, 217, 177, 0.1) 0%, rgba(0, 200, 200, 0.05) 100%); border: 1px solid rgba(0, 217, 177, 0.3); border-radius: 16px;">
                <h1 style="margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                  <span style="color: #e5f7f7;">OpenMind</span>
                  <span style="background: linear-gradient(135deg, #00d9b1 0%, #00c8c8 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">AI</span>
                </h1>
              </div>
            </td>
          </tr>
          
          <!-- Main Card -->
          <tr>
            <td>
              <table width="100%" cellpadding="0" cellspacing="0" style="background: rgba(13, 17, 23, 0.8); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 24px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);">
                
                <!-- Gradient accent line -->
                <tr>
                  <td style="height: 4px; background: linear-gradient(90deg, #00d9b1 0%, #00c8c8 50%, #00d9b1 100%);"></td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 40px;">
                    
                    <!-- Title -->
                    <h2 style="margin: 0 0 8px 0; font-size: 24px; font-weight: 600; color: #e5f7f7;">
                      ✨ Potwierdzenie konsultacji
                    </h2>
                    <p style="margin: 0 0 30px 0; font-size: 16px; color: rgba(229, 247, 247, 0.6);">
                      Szanowna/y ${escapeHtml(booking.clientName)},
                    </p>
                    
                    <p style="margin: 0 0 30px 0; font-size: 15px; line-height: 1.6; color: rgba(229, 247, 247, 0.8);">
                      Dziękujemy za zarezerwowanie bezpłatnej konsultacji. Poniżej znajdziesz szczegóły spotkania:
                    </p>
                    
                    <!-- Booking Details Card -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, rgba(0, 217, 177, 0.08) 0%, rgba(0, 200, 200, 0.04) 100%); border: 1px solid rgba(0, 217, 177, 0.2); border-radius: 16px; margin-bottom: 30px;">
                      <tr>
                        <td style="padding: 24px;">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="padding: 8px 0;">
                                <span style="color: rgba(229, 247, 247, 0.5); font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">📅 Data</span>
                                <div style="color: #e5f7f7; font-size: 16px; font-weight: 500; margin-top: 4px;">${formatDate(booking.bookingDate)}</div>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 8px 0; border-top: 1px solid rgba(0, 217, 177, 0.1);">
                                <span style="color: rgba(229, 247, 247, 0.5); font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">🕐 Godzina</span>
                                <div style="color: #e5f7f7; font-size: 16px; font-weight: 500; margin-top: 4px;">${booking.bookingTime}</div>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 8px 0; border-top: 1px solid rgba(0, 217, 177, 0.1);">
                                <span style="color: rgba(229, 247, 247, 0.5); font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">⏱️ Czas trwania</span>
                                <div style="color: #e5f7f7; font-size: 16px; font-weight: 500; margin-top: 4px;">30 minut</div>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 8px 0; border-top: 1px solid rgba(0, 217, 177, 0.1);">
                                <span style="color: rgba(229, 247, 247, 0.5); font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">💰 Cena</span>
                                <div style="color: #00d9b1; font-size: 16px; font-weight: 600; margin-top: 4px;">BEZPŁATNIE</div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    
                    ${booking.notes ? `
                    <div style="background: rgba(255, 255, 255, 0.03); border-left: 3px solid #00d9b1; padding: 16px 20px; margin-bottom: 30px; border-radius: 0 12px 12px 0;">
                      <span style="color: rgba(229, 247, 247, 0.5); font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">📝 Twoje uwagi</span>
                      <p style="margin: 8px 0 0 0; color: #e5f7f7; font-size: 14px; line-height: 1.5;">${escapeHtml(booking.notes)}</p>
                    </div>
                    ` : ''}
                    
                    <!-- Info Box -->
                    <div style="background: rgba(0, 217, 177, 0.05); border: 1px solid rgba(0, 217, 177, 0.15); border-radius: 12px; padding: 16px 20px; margin-bottom: 30px;">
                      <p style="margin: 0; font-size: 14px; color: rgba(229, 247, 247, 0.7); line-height: 1.5;">
                        ℹ️ Przed konsultacją skontaktujemy się z Tobą telefonicznie lub mailowo w celu ustalenia formy spotkania (online/telefon).
                      </p>
                    </div>
                    
                    <!-- Contact -->
                    <p style="margin: 0; font-size: 14px; color: rgba(229, 247, 247, 0.6); line-height: 1.6;">
                      W razie pytań skontaktuj się z nami:<br>
                      📧 <a href="mailto:biuro@openmind.biz.pl" style="color: #00d9b1; text-decoration: none;">biuro@openmind.biz.pl</a><br>
                      📞 <a href="tel:+48668386730" style="color: #00d9b1; text-decoration: none;">+48 668 386 730</a>
                    </p>
                    
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="text-align: center; padding-top: 30px;">
              <p style="margin: 0; font-size: 13px; color: rgba(229, 247, 247, 0.4);">
                ${COMPANY_NAME}<br>
                Technologia jutra, dostępna dziś.
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

const generateOwnerEmailHtml = (booking: BookingConfirmationRequest): string => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 20px; font-family: 'Inter', 'Segoe UI', Arial, sans-serif; background: #0a0f14; color: #e5f7f7;">
  <div style="max-width: 600px; margin: 0 auto; background: rgba(13, 17, 23, 0.9); border: 1px solid rgba(0, 217, 177, 0.3); border-radius: 16px; padding: 30px;">
    
    <h2 style="margin: 0 0 20px 0; color: #00d9b1; font-size: 20px;">
      🔔 Nowa rezerwacja konsultacji!
    </h2>
    
    <div style="background: rgba(0, 217, 177, 0.1); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
      <h3 style="margin: 0 0 15px 0; color: #e5f7f7; font-size: 16px;">📅 Szczegóły spotkania</h3>
      <p style="margin: 5px 0; color: rgba(229, 247, 247, 0.8);">Data: <strong style="color: #e5f7f7;">${formatDate(booking.bookingDate)}</strong></p>
      <p style="margin: 5px 0; color: rgba(229, 247, 247, 0.8);">Godzina: <strong style="color: #e5f7f7;">${booking.bookingTime}</strong></p>
      <p style="margin: 5px 0; color: rgba(229, 247, 247, 0.8);">Czas: <strong style="color: #e5f7f7;">30 minut</strong></p>
    </div>
    
    <div style="background: rgba(255, 255, 255, 0.05); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
      <h3 style="margin: 0 0 15px 0; color: #e5f7f7; font-size: 16px;">👤 Dane klienta</h3>
      <p style="margin: 5px 0; color: rgba(229, 247, 247, 0.8);">Imię: <strong style="color: #e5f7f7;">${escapeHtml(booking.clientName)}</strong></p>
      <p style="margin: 5px 0; color: rgba(229, 247, 247, 0.8);">Email: <a href="mailto:${escapeHtml(booking.clientEmail)}" style="color: #00d9b1;">${escapeHtml(booking.clientEmail)}</a></p>
      <p style="margin: 5px 0; color: rgba(229, 247, 247, 0.8);">Telefon: <a href="tel:${escapeHtml(booking.clientPhone)}" style="color: #00d9b1;">${escapeHtml(booking.clientPhone)}</a></p>
    </div>
    
    ${booking.notes ? `
    <div style="background: rgba(255, 255, 255, 0.03); border-left: 3px solid #00d9b1; padding: 15px 20px; border-radius: 0 12px 12px 0;">
      <p style="margin: 0 0 5px 0; color: rgba(229, 247, 247, 0.5); font-size: 12px; text-transform: uppercase;">📝 Uwagi klienta</p>
      <p style="margin: 0; color: #e5f7f7;">${escapeHtml(booking.notes)}</p>
    </div>
    ` : ''}
    
  </div>
</body>
</html>
  `;
};

async function sendEmail(to: string, subject: string, html: string, from: string) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to: [to], subject, html }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to send email: ${error}`);
  }

  return await response.json();
}

serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const booking: BookingConfirmationRequest = await req.json();
    
    console.log('Sending booking confirmation for:', booking.clientEmail);
    
    if (!booking.clientEmail || !booking.clientName || !booking.bookingDate || !booking.bookingTime) {
      return new Response(
        JSON.stringify({ error: "Missing required booking fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Email do klienta
    await sendEmail(
      booking.clientEmail,
      `✅ Potwierdzenie konsultacji - ${COMPANY_NAME}`,
      generateClientEmailHtml(booking),
      `${COMPANY_NAME} <${SENDER_EMAIL}>`
    );

    console.log('Client email sent successfully');

    // Email do właściciela
    await sendEmail(
      OWNER_EMAIL,
      `🔔 Nowa konsultacja: ${booking.clientName} - ${formatDate(booking.bookingDate)} ${booking.bookingTime}`,
      generateOwnerEmailHtml(booking),
      `${COMPANY_NAME} System <${SENDER_EMAIL}>`
    );

    console.log('Owner email sent successfully');

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error sending confirmation:", error);
    return new Response(
      JSON.stringify({ error: "Unable to send confirmation email" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
