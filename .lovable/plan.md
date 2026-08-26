# Google reCAPTCHA v3 — ochrona formularzy przed botami

## Cel
Niewidoczna weryfikacja reCAPTCHA v3 przy każdym wysłaniu formularza kontaktowego i rezerwacji, sprawdzana po stronie backendu (nie da się jej obejść z przeglądarki).

## Co będzie chronione
- Formularz kontaktowy (`send-contact-email` + przekazanie do CRM)
- Formularz rezerwacji konsultacji (`send-booking-confirmation`)
- Chatbot (`openai-chat`) — token generowany przy każdej wysyłanej wiadomości (akcja `chat_message`), chroni przed zużyciem limitów AI przez boty
- Doradca AI (`ai-advisor`) — ta sama ochrona, bo również zużywa limity AI

## Jak to zadziała
1. Skrypt reCAPTCHA v3 ładowany leniwie (dopiero przy pierwszej interakcji z formularzem — bez wpływu na Core Web Vitals).
2. Przed wysyłką frontend generuje token dla akcji (`contact_form`, `booking_form`).
3. Token trafia w treści żądania do funkcji backendowej.
4. Backend weryfikuje token w Google (`siteverify`) używając tajnego klucza: sprawdza `success`, `action` i `score >= 0.5`.
5. Wynik poniżej progu → żądanie odrzucone (błąd 403, komunikat PL/EN), e-mail nie wychodzi, rezerwacja nie powstaje.
6. Istniejące limity rate-limit zostają bez zmian — reCAPTCHA jest dodatkową warstwą.

## Co jest potrzebne od Ciebie
Rejestracja witryny w Google reCAPTCHA (typ v3) dla domen `openmindai.pl`, `www.openmindai.pl` i `lovable.app`, a następnie:
- **Site key** (publiczny) — wkleję do kodu frontendu
- **Secret key** (tajny) — poproszę o zapisanie w sekretach backendu

Bez tych kluczy wdrożenie nie ruszy; do czasu ich dodania weryfikacja może działać w trybie „przepuszczaj” (fail-open), żeby formularze nie przestały działać.

## Szczegóły techniczne
- Nowy hook `src/hooks/useRecaptcha.ts`: leniwe wstrzyknięcie `https://www.google.com/recaptcha/api.js?render=SITE_KEY` + `execute(action)`.
- `src/components/ContactForm.tsx`, `src/components/BookingModal.tsx`, `src/components/Chatbot.tsx` i `src/components/AIAdvisorChat.tsx`: pobranie tokenu przed `functions.invoke`, dorzucenie pól `recaptchaToken` i `recaptchaAction`.
- Nowy współdzielony moduł `supabase/functions/_shared/recaptcha.ts` z funkcją `verifyRecaptcha(token, expectedAction)`.
- Weryfikacja wpięta w `send-contact-email`, `forward-to-crm` (pośrednio przez kontakt) oraz `send-booking-confirmation`.
- Sekret `RECAPTCHA_SECRET_KEY` w backendzie; próg score konfigurowalny stałą w kodzie (domyślnie 0.5).
- Ukrycie badge'a Google zgodnie z regulaminem: dyskretna informacja tekstowa „Chronione przez reCAPTCHA – Prywatność / Warunki” pod przyciskiem wysyłki (PL/EN), stylizacja zgodna z motywem.
- Uzupełnienie polityki prywatności o wzmiankę o reCAPTCHA.
- Po zmianach: build i test wysyłki obu formularzy.
