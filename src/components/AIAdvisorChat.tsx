import { useState, useRef, useEffect } from 'react';
import { Send, Download, Loader2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import jsPDF from 'jspdf';
import robotoFontUrl from '@/assets/fonts/Roboto-Regular.ttf';

// Helper: load font as base64 for jsPDF Unicode support
const loadFontBase64 = async (): Promise<string> => {
  const response = await fetch(robotoFontUrl);
  const buffer = await response.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

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
      
      let pdfContent;
      try {
        const cleanContent = data.content.replace(/```json\n?|\n?```/g, '').trim();
        pdfContent = JSON.parse(cleanContent);
      } catch {
        pdfContent = { 
          title: 'Twoje zastosowania AI',
          summary: 'Podsumowanie Twojej rozmowy z doradcą AI.',
          applications: [{ name: 'Podsumowanie', description: data.content, benefit: '' }],
          nextSteps: 'Skontaktuj się z nami!'
        };
      }

      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

      // Embed Roboto font for Polish character support
      const fontBase64 = await loadFontBase64();
      pdf.addFileToVFS('Roboto-Regular.ttf', fontBase64);
      pdf.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');
      pdf.addFont('Roboto-Regular.ttf', 'Roboto', 'bold');
      pdf.addFont('Roboto-Regular.ttf', 'Roboto', 'italic');
      pdf.setFont('Roboto');

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 18;
      const contentWidth = pageWidth - 2 * margin;
      let yPos = 0;

      // Brand colors
      const cyan = { r: 0, g: 219, b: 174 };    // hsl(176, 100%, 43%)
      const darkBg = { r: 12, g: 14, b: 18 };    // dark background
      const darkCard = { r: 18, g: 21, b: 27 };   // card bg
      const textLight = { r: 240, g: 255, b: 252 };
      const textMuted = { r: 140, g: 155, b: 160 };

      const checkPageBreak = (space: number) => {
        if (yPos + space > pageHeight - 30) {
          pdf.addPage();
          // Dark page background
          pdf.setFillColor(darkBg.r, darkBg.g, darkBg.b);
          pdf.rect(0, 0, pageWidth, pageHeight, 'F');
          yPos = margin;
          return true;
        }
        return false;
      };

      // === PAGE BACKGROUND ===
      pdf.setFillColor(darkBg.r, darkBg.g, darkBg.b);
      pdf.rect(0, 0, pageWidth, pageHeight, 'F');

      // === HEADER BAR ===
      // Gradient-like header with cyan accent line
      pdf.setFillColor(darkCard.r, darkCard.g, darkCard.b);
      pdf.rect(0, 0, pageWidth, 38, 'F');
      
      // Cyan accent line at bottom of header
      pdf.setFillColor(cyan.r, cyan.g, cyan.b);
      pdf.rect(0, 38, pageWidth, 1.2, 'F');

      // Logo / Brand name
      pdf.setTextColor(cyan.r, cyan.g, cyan.b);
      pdf.setFontSize(20);
      pdf.setFont('Roboto', 'bold');
      pdf.text('OpenMind AI', margin, 18);

      pdf.setTextColor(textMuted.r, textMuted.g, textMuted.b);
      pdf.setFontSize(9);
      pdf.setFont('Roboto', 'normal');
      pdf.text('Consulting & Solutions', margin, 25);

      // Date on right
      const today = new Date().toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' });
      pdf.setTextColor(textMuted.r, textMuted.g, textMuted.b);
      pdf.setFontSize(8);
      pdf.text(today, pageWidth - margin, 25, { align: 'right' });

      yPos = 50;

      // === TITLE ===
      pdf.setTextColor(textLight.r, textLight.g, textLight.b);
      pdf.setFontSize(20);
      pdf.setFont('Roboto', 'bold');
      const titleText = pdfContent.title || 'Twoje spersonalizowane zastosowania AI';
      const titleLines = pdf.splitTextToSize(titleText, contentWidth);
      pdf.text(titleLines, margin, yPos);
      yPos += titleLines.length * 8 + 4;

      // Cyan underline for title
      pdf.setDrawColor(cyan.r, cyan.g, cyan.b);
      pdf.setLineWidth(0.6);
      pdf.line(margin, yPos, margin + 50, yPos);
      yPos += 10;

      // === SUMMARY ===
      if (pdfContent.summary) {
        pdf.setTextColor(textMuted.r, textMuted.g, textMuted.b);
        pdf.setFontSize(10);
        pdf.setFont('Roboto', 'italic');
        const summaryLines = pdf.splitTextToSize(pdfContent.summary, contentWidth);
        pdf.text(summaryLines, margin, yPos);
        yPos += summaryLines.length * 5 + 12;
      }

      // === APPLICATIONS ===
      const applications = pdfContent.applications || [];

      applications.forEach((app: any, index: number) => {
        const appName = app.name || 'Zastosowanie';
        const appDesc = app.description || '';
        const appBenefit = app.benefit || '';

        // Pre-calculate heights
        pdf.setFontSize(11);
        const nameLines = pdf.splitTextToSize(appName, contentWidth - 20);
        pdf.setFontSize(9);
        const descLines = pdf.splitTextToSize(appDesc, contentWidth - 16);
        pdf.setFontSize(8);
        const benefitLines = appBenefit ? pdf.splitTextToSize(`✦ ${appBenefit}`, contentWidth - 16) : [];

        const cardPadding = 8;
        const cardHeight = cardPadding + 
          (nameLines.length * 5.5) + 4 +
          (descLines.length * 4.2) +
          (benefitLines.length > 0 ? 4 + (benefitLines.length * 3.8) : 0) +
          cardPadding;

        checkPageBreak(cardHeight + 8);

        // Card background
        pdf.setFillColor(darkCard.r, darkCard.g, darkCard.b);
        pdf.roundedRect(margin, yPos, contentWidth, cardHeight, 2, 2, 'F');

        // Cyan left accent bar
        pdf.setFillColor(cyan.r, cyan.g, cyan.b);
        pdf.rect(margin, yPos, 2.5, cardHeight, 'F');

        let textY = yPos + cardPadding;

        // Number badge + name
        pdf.setTextColor(cyan.r, cyan.g, cyan.b);
        pdf.setFontSize(11);
        pdf.setFont('Roboto', 'bold');
        const numberStr = `${String(index + 1).padStart(2, '0')}`;
        pdf.text(numberStr, margin + 7, textY + 1);
        
        pdf.setTextColor(textLight.r, textLight.g, textLight.b);
        pdf.text(nameLines, margin + 18, textY + 1);
        textY += nameLines.length * 5.5 + 4;

        // Description
        pdf.setTextColor(textMuted.r, textMuted.g, textMuted.b);
        pdf.setFontSize(9);
        pdf.setFont('Roboto', 'normal');
        pdf.text(descLines, margin + 8, textY);
        textY += descLines.length * 4.2;

        // Benefit
        if (benefitLines.length > 0) {
          textY += 3;
          pdf.setTextColor(cyan.r, cyan.g, cyan.b);
          pdf.setFontSize(8);
          pdf.setFont('Roboto', 'italic');
          pdf.text(benefitLines, margin + 8, textY);
        }

        yPos += cardHeight + 5;
      });

      // === NEXT STEPS CTA ===
      checkPageBreak(30);
      yPos += 6;

      const nextStepsText = pdfContent.nextSteps || 'Skontaktuj się z nami, aby omówić wdrożenie tych rozwiązań!';
      pdf.setFontSize(10);
      pdf.setFont('Roboto', 'normal');
      const nextStepsLines = pdf.splitTextToSize(nextStepsText, contentWidth - 20);
      const ctaHeight = 12 + (nextStepsLines.length * 5);

      checkPageBreak(ctaHeight + 8);

      // CTA box with cyan background
      pdf.setFillColor(cyan.r, cyan.g, cyan.b);
      pdf.roundedRect(margin, yPos, contentWidth, ctaHeight, 2, 2, 'F');

      pdf.setTextColor(darkBg.r, darkBg.g, darkBg.b);
      pdf.setFontSize(10);
      pdf.setFont('Roboto', 'bold');
      pdf.text(nextStepsLines, margin + 10, yPos + 8);

      // === FOOTER ===
      const totalPages = pdf.getNumberOfPages();
      for (let p = 1; p <= totalPages; p++) {
        pdf.setPage(p);
        const footerY = pageHeight - 12;
        
        // Footer line
        pdf.setDrawColor(30, 35, 45);
        pdf.setLineWidth(0.3);
        pdf.line(margin, footerY - 4, pageWidth - margin, footerY - 4);

        pdf.setTextColor(cyan.r, cyan.g, cyan.b);
        pdf.setFontSize(8);
        pdf.setFont('Roboto', 'bold');
        pdf.text('OpenMind AI', margin, footerY);

        pdf.setTextColor(textMuted.r, textMuted.g, textMuted.b);
        pdf.setFontSize(7);
        pdf.setFont('Roboto', 'normal');
        pdf.text('biuro@openmindai.pl  ·  openmindai.pl', margin + 28, footerY);

        pdf.text(`${p} / ${totalPages}`, pageWidth - margin, footerY, { align: 'right' });
      }

      pdf.save('Diagnoza-AI-OpenMind.pdf');
      toast.success('Raport PDF został pobrany!');
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error('Nie udało się wygenerować raportu PDF.');
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
            Pobierz raport PDF
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
