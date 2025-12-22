import { useState, useRef, useEffect } from 'react';
import { Send, Download, Loader2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-advisor`;

const AIAdvisorChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Initialize conversation
  useEffect(() => {
    if (!isInitialized) {
      startConversation();
      setIsInitialized(true);
    }
  }, [isInitialized]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const startConversation = async () => {
    setIsLoading(true);
    let assistantContent = '';

    const updateAssistant = (chunk: string) => {
      assistantContent += chunk;
      setMessages([{ role: 'assistant', content: assistantContent }]);
    };

    try {
      await streamChat({
        messages: [],
        onDelta: updateAssistant,
        onDone: () => setIsLoading(false),
      });
    } catch (error) {
      console.error('Failed to start conversation:', error);
      setMessages([{ 
        role: 'assistant', 
        content: 'Witaj! Jestem Twoim doradcą AI. Opowiedz mi, w jakiej dziedzinie szukasz zastosowań sztucznej inteligencji - biznes, życie osobiste, edukacja, czy może coś innego?' 
      }]);
      setIsLoading(false);
    }
  };

  const streamChat = async ({
    messages,
    onDelta,
    onDone,
  }: {
    messages: Message[];
    onDelta: (deltaText: string) => void;
    onDone: () => void;
  }) => {
    const resp = await fetch(CHAT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages }),
    });

    if (!resp.ok) {
      const errorData = await resp.json().catch(() => ({}));
      if (resp.status === 429 || resp.status === 402) {
        toast.error(errorData.error || 'Usługa tymczasowo niedostępna');
      }
      throw new Error(errorData.error || 'Failed to stream');
    }

    if (!resp.body) throw new Error('No response body');

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = '';
    let streamDone = false;

    while (!streamDone) {
      const { done, value } = await reader.read();
      if (done) break;
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith('\r')) line = line.slice(0, -1);
        if (line.startsWith(':') || line.trim() === '') continue;
        if (!line.startsWith('data: ')) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === '[DONE]') {
          streamDone = true;
          break;
        }

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) onDelta(content);
        } catch {
          textBuffer = line + '\n' + textBuffer;
          break;
        }
      }
    }

    onDone();
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    let assistantContent = '';
    const updateAssistant = (chunk: string) => {
      assistantContent += chunk;
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === 'assistant' && prev.length > 1 && prev[prev.length - 2]?.role === 'user') {
          return prev.map((m, i) => 
            i === prev.length - 1 ? { ...m, content: assistantContent } : m
          );
        }
        return [...prev, { role: 'assistant', content: assistantContent }];
      });
    };

    try {
      await streamChat({
        messages: newMessages,
        onDelta: updateAssistant,
        onDone: () => setIsLoading(false),
      });
    } catch (error) {
      console.error('Failed to send message:', error);
      setIsLoading(false);
      toast.error('Wystąpił błąd. Spróbuj ponownie.');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const generatePDF = async () => {
    if (messages.length < 3) {
      toast.error('Najpierw porozmawiaj z doradcą, aby otrzymać propozycje zastosowań.');
      return;
    }

    setIsLoading(true);
    try {
      const resp = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages, generatePdf: true }),
      });

      if (!resp.ok) throw new Error('Failed to generate PDF');

      const data = await resp.json();
      
      // Parse the JSON content
      let pdfContent;
      try {
        const cleanContent = data.content.replace(/```json\n?|\n?```/g, '').trim();
        pdfContent = JSON.parse(cleanContent);
      } catch {
        pdfContent = { 
          title: 'Twoje zastosowania AI',
          applications: [{ name: 'Podsumowanie', description: data.content, benefit: '' }],
          nextSteps: 'Skontaktuj się z nami!'
        };
      }

      // Generate HTML for PDF
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>${pdfContent.title}</title>
          <style>
            body { font-family: 'Segoe UI', sans-serif; padding: 40px; color: #1a1a1a; }
            h1 { color: #00d4aa; margin-bottom: 30px; }
            .app { margin-bottom: 25px; padding: 20px; background: #f5f5f5; border-radius: 10px; }
            .app h3 { color: #00a8a8; margin: 0 0 10px 0; }
            .app p { margin: 5px 0; }
            .benefit { color: #666; font-style: italic; }
            .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #00d4aa; }
            .footer p { color: #00a8a8; font-weight: bold; }
          </style>
        </head>
        <body>
          <h1>${pdfContent.title}</h1>
          ${pdfContent.applications.map((app: any, i: number) => `
            <div class="app">
              <h3>${i + 1}. ${app.name}</h3>
              <p>${app.description}</p>
              ${app.benefit ? `<p class="benefit">✓ ${app.benefit}</p>` : ''}
            </div>
          `).join('')}
          <div class="footer">
            <p>${pdfContent.nextSteps}</p>
            <p>OpenMind AI Consulting | kontakt@openmind.pl</p>
          </div>
        </body>
        </html>
      `;

      // Create and download
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Zastosowania-AI-OpenMind.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success('Podsumowanie zostało pobrane!');
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error('Nie udało się wygenerować podsumowania.');
    } finally {
      setIsLoading(false);
    }
  };

  const goToContact = () => {
    navigate('/contact');
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Messages - fixed scroll with mouse wheel */}
      <div 
        className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-4 space-y-4" 
        style={{ 
          overscrollBehavior: 'contain',
          scrollBehavior: 'auto',
          WebkitOverflowScrolling: 'touch',
        }}
        onWheel={(e) => {
          e.stopPropagation();
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                msg.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted/50 text-foreground'
              }`}
            >
              <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && messages.length === 0 && (
          <div className="flex justify-start">
            <div className="bg-muted/50 rounded-2xl px-4 py-3">
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Action buttons */}
      {messages.length >= 4 && (
        <div className="px-4 py-2 flex gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={generatePDF}
            disabled={isLoading}
            className="gap-2"
          >
            <Download size={16} />
            Pobierz podsumowanie
          </Button>
          <Button
            size="sm"
            onClick={goToContact}
            className="gap-2"
          >
            Umów konsultację
            <ArrowRight size={16} />
          </Button>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-border/30">
        <div className="flex gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Napisz wiadomość..."
            className="flex-1 bg-muted/30 border border-border/50 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[48px] max-h-[120px]"
            rows={1}
            disabled={isLoading}
          />
          <Button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            size="icon"
            className="h-12 w-12 rounded-xl shrink-0"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send size={18} />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIAdvisorChat;
