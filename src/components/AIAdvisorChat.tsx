import { useState, useRef, useEffect } from 'react';
import { Send, Download, Loader2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import jsPDF from 'jspdf';

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
          summary: 'Podsumowanie Twojej rozmowy z doradcą AI.',
          applications: [{ name: 'Podsumowanie', description: data.content, benefit: '' }],
          nextSteps: 'Skontaktuj się z nami!'
        };
      }

      // Generate PDF using jsPDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - 2 * margin;
      let yPos = margin;

      // Header with gradient-like effect
      pdf.setFillColor(0, 212, 170);
      pdf.rect(0, 0, pageWidth, 45, 'F');
      
      // Logo text
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(24);
      pdf.setFont('helvetica', 'bold');
      pdf.text('OpenMind AI', margin, 25);
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Consulting & Solutions', margin, 35);

      yPos = 60;

      // Title
      pdf.setTextColor(0, 168, 168);
      pdf.setFontSize(20);
      pdf.setFont('helvetica', 'bold');
      const titleLines = pdf.splitTextToSize(pdfContent.title || 'Twoje spersonalizowane zastosowania AI', contentWidth);
      pdf.text(titleLines, margin, yPos);
      yPos += titleLines.length * 8 + 10;

      // Summary
      if (pdfContent.summary) {
        pdf.setTextColor(100, 100, 100);
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'italic');
        const summaryLines = pdf.splitTextToSize(pdfContent.summary, contentWidth);
        pdf.text(summaryLines, margin, yPos);
        yPos += summaryLines.length * 5 + 15;
      }

      // Applications
      pdf.setTextColor(26, 26, 26);
      const applications = pdfContent.applications || [];
      
      applications.forEach((app: any, index: number) => {
        // Check if we need a new page
        if (yPos > pageHeight - 60) {
          pdf.addPage();
          yPos = margin;
        }

        // Application box background
        pdf.setFillColor(245, 245, 245);
        const boxHeight = 35;
        pdf.roundedRect(margin - 5, yPos - 5, contentWidth + 10, boxHeight, 3, 3, 'F');

        // Application number and name
        pdf.setTextColor(0, 168, 168);
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        const appTitle = `${index + 1}. ${app.name || 'Zastosowanie'}`;
        pdf.text(appTitle, margin, yPos + 5);

        // Description
        pdf.setTextColor(60, 60, 60);
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        const descLines = pdf.splitTextToSize(app.description || '', contentWidth - 10);
        pdf.text(descLines.slice(0, 2), margin, yPos + 13);

        // Benefit
        if (app.benefit) {
          pdf.setTextColor(0, 150, 136);
          pdf.setFontSize(9);
          pdf.setFont('helvetica', 'italic');
          pdf.text(`✓ ${app.benefit}`, margin, yPos + 25);
        }

        yPos += boxHeight + 10;
      });

      // Next steps section
      if (yPos > pageHeight - 50) {
        pdf.addPage();
        yPos = margin;
      }

      yPos += 10;
      pdf.setFillColor(0, 212, 170);
      pdf.roundedRect(margin - 5, yPos - 5, contentWidth + 10, 25, 3, 3, 'F');
      
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      const nextStepsText = pdfContent.nextSteps || 'Skontaktuj się z nami, aby omówić wdrożenie!';
      const nextStepsLines = pdf.splitTextToSize(nextStepsText, contentWidth);
      pdf.text(nextStepsLines, margin, yPos + 8);

      // Footer
      const footerY = pageHeight - 15;
      pdf.setDrawColor(0, 212, 170);
      pdf.setLineWidth(0.5);
      pdf.line(margin, footerY - 5, pageWidth - margin, footerY - 5);
      
      pdf.setTextColor(0, 168, 168);
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.text('OpenMind AI Consulting', margin, footerY);
      
      pdf.setTextColor(100, 100, 100);
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'normal');
      pdf.text('biuro@openmindai.pl', margin, footerY + 5);
      
      // Date on the right
      const today = new Date().toLocaleDateString('pl-PL');
      pdf.text(`Wygenerowano: ${today}`, pageWidth - margin - 40, footerY);

      // Save PDF
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
