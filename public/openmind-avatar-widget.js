(() => {
  const script = document.currentScript;
  const clientId = script?.dataset.clientId || 'openmindai';
  const locale = script?.dataset.locale || 'pl';
  const apiBaseUrl = (script?.dataset.apiBaseUrl || '').replace(/\/$/, '');

  function injectStyles() {
    if (document.getElementById('om-avatar-widget-styles')) return;
    const style = document.createElement('style');
    style.id = 'om-avatar-widget-styles';
    style.textContent = ".om-avatar-launcher,.om-avatar-widget,.om-avatar-widget *{box-sizing:border-box;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,\"Segoe UI\",sans-serif}\n.om-avatar-launcher{position:fixed;right:22px;bottom:22px;z-index:2147483000;border:1px solid #111827;background:#111827;color:#fff;border-radius:8px;min-height:42px;padding:10px 14px;cursor:pointer;font-weight:700;box-shadow:0 18px 50px rgba(17,24,39,.18)}\n.om-avatar-widget{position:fixed;right:22px;bottom:82px;width:min(440px,calc(100vw - 28px));max-height:calc(100vh - 104px);display:none;grid-template-rows:auto auto minmax(190px,1fr) auto;border:1px solid #dce2ea;border-radius:8px;background:#fff;box-shadow:0 18px 60px rgba(17,24,39,.22);overflow:hidden;z-index:2147483001;color:#111827}\n.om-avatar-widget.is-open{display:grid}.om-avatar-widget button{font:inherit}\n.om-avatar-header{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px;border-bottom:1px solid #dce2ea}\n.om-avatar-title{display:grid;gap:3px}.om-avatar-title strong{font-size:15px}.om-avatar-title span{font-size:12px;color:#5f6b7a}\n.om-avatar-close{width:36px;min-height:36px;padding:0;border:1px solid #111827;background:#111827;color:#fff;border-radius:8px;cursor:pointer}\n.om-avatar-video{height:188px;border-bottom:1px solid #dce2ea;background:linear-gradient(145deg,rgba(29,78,216,.12),transparent 50%),linear-gradient(30deg,rgba(4,120,87,.14),transparent 52%),#eef2f7;display:grid;place-items:center;position:relative}\n.om-avatar-face{width:92px;height:92px;border-radius:50%;background:#f0c7a7;border:3px solid #111827;position:relative}\n.om-avatar-face:before{content:\"\";position:absolute;left:8px;right:8px;top:-12px;height:38px;border-radius:40px 40px 12px 12px;background:#1f2937}\n.om-avatar-face:after{content:\"\";position:absolute;left:29px;bottom:22px;width:32px;height:12px;border-bottom:3px solid #111827;border-radius:0 0 18px 18px;animation:omTalk 1.1s ease-in-out infinite}\n@keyframes omTalk{0%,100%{transform:scaleX(.92);height:10px}50%{transform:scaleX(1.05);height:18px}}\n.om-avatar-status{position:absolute;left:12px;bottom:12px;right:12px;border:1px solid rgba(220,226,234,.92);border-radius:8px;padding:9px 10px;background:rgba(255,255,255,.9);font-size:12px;color:#344052}\n.om-avatar-chat{overflow:auto;background:#fafbfc;padding:12px;display:grid;gap:9px;align-content:start}\n.om-msg{max-width:88%;border:1px solid #dce2ea;border-radius:8px;background:#fff;padding:10px 11px;line-height:1.42;font-size:14px}.om-msg.user{justify-self:end;background:#eaf1ff;border-color:#b8c9ef}\n.om-avatar-controls{border-top:1px solid #dce2ea;padding:12px;display:grid;gap:10px}.om-chips{display:flex;gap:8px;overflow-x:auto;padding-bottom:2px}\n.om-chips button,.om-slots button{white-space:nowrap;background:#fff;color:#111827;border:1px solid #dce2ea;border-radius:8px;min-height:34px;padding:7px 10px;font-size:13px;cursor:pointer}\n.om-input-row{display:grid;grid-template-columns:1fr auto;gap:8px}\n.om-input-row input,.om-lead-form input,.om-lead-form textarea{width:100%;border:1px solid #dce2ea;border-radius:8px;min-height:42px;padding:9px 11px;background:#fff;color:#111827}\n.om-input-row button,.om-lead-form button{border:1px solid #111827;background:#111827;color:#fff;border-radius:8px;min-height:42px;padding:10px 14px;cursor:pointer;font-weight:700}\n.om-lead-form{display:none;gap:8px;border-top:1px solid #dce2ea;padding:12px}.om-lead-form.is-open{display:grid}\n.om-consent{display:grid;grid-template-columns:auto 1fr;align-items:start;gap:8px;color:#5f6b7a;font-size:12px;line-height:1.35}.om-consent input{width:16px;margin-top:2px}\n.om-slots{display:none;gap:8px}.om-slots.is-open{display:grid}.om-slots button{justify-content:flex-start;text-align:left}\n.om-avatar-iframe{width:100%;height:100%;border:0;display:block;aspect-ratio:16/9}\n@media(max-width:560px){.om-avatar-launcher{left:14px;right:14px}.om-avatar-widget{right:14px;bottom:80px}}";
    document.head.appendChild(style);
  }

  injectStyles();

  const state = {
    conversationId: null,
    session: null,
    leadId: null,
    slots: [],
    selectedIntent: 'company_overview',
    config: null,
  };

  const responses = {
    company: 'OpenMind AI pomaga firmom, agencjom i szkołom wdrażać sztuczną inteligencję: od konsultingu i szkoleń po automatyzacje, agentów AI oraz materiały wideo i obrazy AI.',
    pricing: 'Mogę podać orientacyjne widełki: audyt AI od 500 do 1500 PLN netto, szkolenie zespołu od 2500 do 8000 PLN netto, automatyzacja od 3000 do 12000 PLN netto, a live avatar lub agent AI zwykle od 8000 PLN netto za setup.',
    automation: 'Automatyzację najlepiej zacząć od jednego konkretnego procesu: obsługa klienta, raporty, analiza danych, zapytania ze strony albo praca administracyjna. Jaki proces chcesz usprawnić jako pierwszy?',
    training: 'Szkolenia są praktyczne: ChatGPT, automatyzacja pracy, generowanie obrazów i wideo oraz zasady bezpiecznego użycia AI w firmie lub szkole.',
    meeting: 'Jasne. Żeby przygotować rozmowę i wysłać potwierdzenie, potrzebuję imienia, emaila, telefonu, firmy oraz krótkiego opisu potrzeby. Potrzebna jest też zgoda na kontakt.',
  };

  function priceLine(item) {
    const to = item.price_to ? ` do ${item.price_to}` : '+';
    return `${item.label}: od ${item.price_from}${to} ${item.currency}`;
  }

  function pricingResponse() {
    const pricing = state.config?.pricing || [];
    if (!pricing.length) return responses.pricing;
    const lines = pricing.slice(0, 5).map(priceLine).join('; ');
    return `Mogę podać orientacyjne widełki: ${lines}. Finalna cena zależy od zakresu, integracji i liczby użytkowników.`;
  }

  function configResponse(intent) {
    if (intent === 'pricing') return pricingResponse();
    if (intent === 'company') return state.config?.knowledge?.company_overview || responses.company;
    return state.config?.knowledge?.answers?.[intent] || responses[intent] || responses.company;
  }
  function escapeAttr(value) {
    return String(value || '').replace(/[&\"<>]/g, (char) => ({ '&': '&amp;', '\"': '&quot;', '<': '&lt;', '>': '&gt;' }[char]));
  }

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function buildWidget() {
    const launcher = el('button', 'om-avatar-launcher', 'Zapytaj doradcę AI');
    const widget = el('section', 'om-avatar-widget');
    widget.setAttribute('aria-label', 'OpenMind AI live avatar');
    widget.innerHTML = `
      <header class="om-avatar-header">
        <div class="om-avatar-title">
          <strong>OpenMind AI Advisor</strong>
          <span data-role="session-status">Łączenie...</span>
        </div>
        <button class="om-avatar-close" type="button" aria-label="Zamknij">×</button>
      </header>
      <div class="om-avatar-video">
        <div class="om-avatar-face" aria-hidden="true"></div>
        <div class="om-avatar-status" data-role="avatar-status">Kliknij, aby rozpocząć sesję doradcy AI.</div>
      </div>
      <div class="om-avatar-chat" data-role="chat"></div>
      <form class="om-lead-form" data-role="lead-form">
        <input name="name" placeholder="Imię">
        <input name="email" placeholder="Email">
        <input name="phone" placeholder="Telefon">
        <input name="company" placeholder="Firma / instytucja">
        <textarea name="problem_description" rows="3" placeholder="Krótko: czego ma dotyczyć rozmowa?"></textarea>
        <label class="om-consent">
          <input name="consent_contact" type="checkbox">
          <span>Wyrażam zgodę na kontakt ze strony OpenMind AI w sprawie mojego zapytania.</span>
        </label>
        <button type="submit">Zapisz lead i pokaż terminy</button>
        <div class="om-slots" data-role="slots"></div>
      </form>
      <div class="om-avatar-controls">
        <div class="om-chips">
          <button type="button" data-intent="company">O firmie</button>
          <button type="button" data-intent="pricing">Ceny</button>
          <button type="button" data-intent="automation">Automatyzacja</button>
          <button type="button" data-intent="training">Szkolenia</button>
          <button type="button" data-intent="meeting">Umów spotkanie</button>
        </div>
        <div class="om-input-row">
          <input data-role="text-input" placeholder="Napisz pytanie...">
          <button type="button" data-role="send">Wyślij</button>
        </div>
      </div>
    `;
    document.body.append(launcher, widget);
    return { launcher, widget };
  }

  const ui = buildWidget();
  const chat = ui.widget.querySelector('[data-role="chat"]');
  const form = ui.widget.querySelector('[data-role="lead-form"]');
  const slots = ui.widget.querySelector('[data-role="slots"]');
  const status = ui.widget.querySelector('[data-role="session-status"]');
  let avatarStatus = ui.widget.querySelector('[data-role="avatar-status"]');
  const textInput = ui.widget.querySelector('[data-role="text-input"]');

  function renderAvatarEmbed(clientConfig) {
    const embed = clientConfig?.avatar_embed;
    if (!embed?.url) return false;
    const video = ui.widget.querySelector('.om-avatar-video');
    if (!video || video.dataset.embedInstalled === 'true') return true;
    video.dataset.embedInstalled = 'true';
    video.innerHTML = `<iframe class="om-avatar-iframe" src="${escapeAttr(embed.url)}" allow="${escapeAttr(embed.allow || 'microphone')}" title="${escapeAttr(embed.title || 'LiveAvatar Embed')}"></iframe><div class="om-avatar-status" data-role="avatar-status">HeyGen LiveAvatar embed aktywny.</div>`;
    avatarStatus = ui.widget.querySelector('[data-role="avatar-status"]');
    return true;
  }

  async function loadConfig() {
    if (state.config) return state.config;
    try {
      const clientConfig = await api(`/api/config?client_id=${encodeURIComponent(clientId)}`);
      state.config = clientConfig;
      ui.launcher.textContent = clientConfig.brand?.launcher_label || 'Zapytaj doradcę AI';
      ui.widget.querySelector('.om-avatar-title strong').textContent = clientConfig.brand?.advisor_name || 'OpenMind AI Advisor';
      const consent = ui.widget.querySelector('.om-consent span');
      if (consent && clientConfig.lead_capture?.consent_text) consent.textContent = clientConfig.lead_capture.consent_text;
      return clientConfig;
    } catch {
      state.config = { brand: { name: 'OpenMind AI' } };
      return state.config;
    }
  }


  function addMessage(text, role = 'agent') {
    const msg = el('div', role === 'user' ? 'om-msg user' : 'om-msg', text);
    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
  }

  async function openWidget() {
    ui.widget.classList.add('is-open');
    const clientConfig = await loadConfig();
    if (renderAvatarEmbed(clientConfig)) {
      if (!state.session) {
        state.session = { provider: 'heygen_embed' };
        setStatus('HeyGen LiveAvatar embed aktywny.');
        addMessage(clientConfig.welcome_message || 'Cześć, jestem doradcą AI OpenMind AI. Możesz rozmawiać ze mną głosowo w oknie avatara.');
      }
      return;
    }
    if (!state.session) startSession();
  }

  function setStatus(text) {
    status.textContent = text;
    avatarStatus.textContent = text;
  }

  async function api(path, options = {}) {
    const url = apiBaseUrl && path.startsWith('/') ? `${apiBaseUrl}${path}` : path;
    const response = await fetch(url, {
      ...options,
      headers: {
        'content-type': 'application/json',
        ...(options.headers || {}),
      },
    });
    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || 'Błąd API');
    }
    return payload;
  }

  async function startSession() {
    setStatus('Startuję sesję avatara...');
    try {
      const clientConfig = await loadConfig();
      const session = await api('/api/avatar/session', {
        method: 'POST',
        body: JSON.stringify({
          client_id: clientId,
          locale,
          visitor_id: localStorage.getItem('om_visitor_id') || crypto.randomUUID(),
          source_url: location.href,
        }),
      });
      localStorage.setItem('om_visitor_id', session.visitor_id || crypto.randomUUID());
      state.session = session;
      state.conversationId = session.conversation_id;
      if (session.provider === 'demo') {
        setStatus('Tryb demo: leady i kalendarz działają lokalnie.');
      } else {
        setStatus('Sesja LiveAvatar gotowa. Następny krok: podpięcie LiveKit Web SDK.');
      }
      addMessage(clientConfig.welcome_message || 'Cześć, jestem doradcą AI OpenMind AI. Chcesz porozmawiać o wdrożeniu AI, szkoleniu, automatyzacji, materiałach wideo AI czy cenach?');
    } catch (error) {
      setStatus('Nie udało się uruchomić sesji. Działa fallback tekstowy.');
      addMessage(`Fallback tekstowy: ${error.message}`);
    }
  }

  function classifyText(text) {
    const lower = text.toLowerCase();
    if (lower.includes('cena') || lower.includes('koszt') || lower.includes('ile')) return 'pricing';
    if (lower.includes('spotkanie') || lower.includes('kontakt') || lower.includes('umów')) return 'meeting';
    if (lower.includes('automat')) return 'automation';
    if (lower.includes('szkol')) return 'training';
    return 'company';
  }

  function handleIntent(intent) {
    state.selectedIntent = intent === 'meeting' ? 'book_meeting' : intent;
    addMessage(ui.widget.querySelector(`[data-intent="${intent}"]`)?.textContent || 'Pytanie', 'user');
    addMessage(configResponse(intent));
    if (intent === 'meeting') form.classList.add('is-open');
  }

  async function submitLead(event) {
    event.preventDefault();
    const data = new FormData(form);
    const payload = {
      client_id: clientId,
      conversation_id: state.conversationId,
      name: data.get('name'),
      email: data.get('email'),
      phone: data.get('phone'),
      company: data.get('company'),
      organization_type: 'firma',
      interest_area: state.selectedIntent,
      problem_description: data.get('problem_description'),
      timeline: 'do ustalenia',
      budget_range: '',
      intent: 'book_meeting',
      consent_contact: data.get('consent_contact') === 'on',
      consent_text_version: state.config?.lead_capture?.consent_version || '2026-07-06-v1',
      source_url: location.href,
    };

    try {
      const lead = await api('/api/leads', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      state.leadId = lead.lead_id;
      addMessage(`Lead zapisany. Ocena jakości: ${lead.lead_score}. Pobieram dostępne terminy.`);
      await loadSlots();
    } catch (error) {
      addMessage(error.message);
    }
  }

  async function loadSlots() {
    const payload = await api('/api/calendar/slots');
    state.slots = payload.slots || [];
    slots.innerHTML = '';
    for (const slot of state.slots.slice(0, 4)) {
      const button = el('button', '', slot.label);
      button.type = 'button';
      button.addEventListener('click', () => bookSlot(slot));
      slots.appendChild(button);
    }
    slots.classList.add('is-open');
  }

  async function bookSlot(slot) {
    if (!state.leadId) {
      addMessage('Najpierw zapisz lead, żebym mógł przypisać spotkanie.');
      return;
    }
    try {
      const booking = await api('/api/calendar/book', {
        method: 'POST',
        body: JSON.stringify({
          client_id: clientId,
          lead_id: state.leadId,
          slot_id: slot.slot_id,
          start: slot.start,
          end: slot.end,
          timezone: slot.timezone,
        }),
      });
      addMessage(`Wybrany termin: ${slot.label}`, 'user');
      addMessage(`${booking.message} Status: ${booking.status}.`);
    } catch (error) {
      addMessage(error.message);
    }
  }

  ui.launcher.addEventListener('click', openWidget);
  document.querySelectorAll('[data-open-avatar]').forEach((node) => node.addEventListener('click', openWidget));
  ui.widget.querySelector('.om-avatar-close').addEventListener('click', () => ui.widget.classList.remove('is-open'));
  ui.widget.querySelectorAll('[data-intent]').forEach((node) => {
    node.addEventListener('click', () => handleIntent(node.dataset.intent));
  });
  ui.widget.querySelector('[data-role="send"]').addEventListener('click', () => {
    const text = textInput.value.trim();
    if (!text) return;
    addMessage(text, 'user');
    textInput.value = '';
    const intent = classifyText(text);
    addMessage(configResponse(intent));
    if (intent === 'meeting') form.classList.add('is-open');
  });
  textInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      ui.widget.querySelector('[data-role="send"]').click();
    }
  });
  form.addEventListener('submit', submitLead);
})();
