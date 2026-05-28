import { useState, useEffect, useRef, useCallback } from "react";
import { Send, X } from "lucide-react";
import { Button } from "./ui/button";
import logo from '@/assets/openmind-logo.webp';
import ReactMarkdown from 'react-markdown';
import { useLanguage } from '@/contexts/LanguageContext';

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/openai-chat`;

function getSessionId(): string {
  let id = localStorage.getItem("openmind-chat-session");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("openmind-chat-session", id);
  }
  return id;
}

const Chatbot = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const sessionId = useRef(getSessionId());

  // Auto-open once on first visit
  useEffect(() => {
    const opened = localStorage.getItem("chatbot-opened");
    if (!opened) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem("chatbot-opened", "true");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Show greeting bubble when chatbot is closed
  useEffect(() => {
    if (isOpen) {
      setShowBubble(false);
      return;
    }
    const dismissed = sessionStorage.getItem("chatbot-bubble-dismissed");
    if (dismissed) return;
    const timer = setTimeout(() => setShowBubble(true), 2500);
    return () => clearTimeout(timer);
  }, [isOpen]);

  const dismissBubble = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowBubble(false);
    sessionStorage.setItem("chatbot-bubble-dismissed", "1");
  };

  // Scroll to bottom on new messages
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: Msg = { role: "user", content: text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    let assistantSoFar = "";

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: updatedMessages,
          sessionId: sessionId.current,
          conversationId,
        }),
      });

      // Get conversation ID from response
      const convId = resp.headers.get("X-Conversation-Id");
      if (convId) setConversationId(convId);

      if (!resp.ok || !resp.body) {
        const errorData = await resp.json().catch(() => ({}));
        throw new Error(errorData.error || "Błąd połączenia");
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantSoFar += content;
              setMessages((prev) => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant") {
                  return prev.map((m, i) =>
                    i === prev.length - 1 ? { ...m, content: assistantSoFar } : m
                  );
                }
                return [...prev, { role: "assistant", content: assistantSoFar }];
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (e: any) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `⚠️ ${e.message || (language === 'pl' ? "Przepraszam, wystąpił błąd. Spróbuj ponownie." : "Sorry, an error occurred. Please try again.")}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages, conversationId, language]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-24 right-4 md:bottom-24 md:right-6 z-50">
      {!isOpen ? (
        <div className="flex flex-col items-end gap-3">
          {showBubble && (
            <button
              type="button"
              onClick={() => { setIsOpen(true); setShowBubble(false); }}
              className="relative group max-w-[240px] rounded-2xl rounded-br-sm bg-card/95 backdrop-blur-xl border border-primary/40 px-4 py-2.5 pr-8 text-sm text-foreground shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-500 hover:border-primary/70 transition-colors"
              style={{ boxShadow: '0 0 30px rgba(0, 223, 217, 0.18), 0 10px 25px rgba(0,0,0,0.4)' }}
            >
              <span className="block text-left leading-snug">
                {language === 'pl' ? 'W czym mogę Ci pomóc? 👋' : 'How can I help you? 👋'}
              </span>
              <span
                onClick={dismissBubble}
                role="button"
                aria-label={language === 'pl' ? 'Zamknij' : 'Close'}
                className="absolute top-1.5 right-1.5 w-5 h-5 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
              >
                <X className="w-3 h-3" />
              </span>
              {/* tail */}
              <span className="absolute -bottom-1.5 right-4 w-3 h-3 bg-card/95 border-r border-b border-primary/40 rotate-45" />
            </button>
          )}
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full w-20 h-20 p-0 overflow-visible relative group
                     bg-gradient-to-br from-black via-gray-900 to-black
                     border-2 border-primary
                     before:absolute before:inset-0 before:rounded-full 
                     before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-transparent before:opacity-60
                     after:absolute after:inset-0 after:rounded-full after:border-2 after:border-primary 
                     after:animate-[ping_4s_cubic-bezier(0.4,0,0.6,1)_infinite] after:opacity-50
                     hover:scale-105 transition-all duration-300"
          style={{
            boxShadow: '0 0 25px rgba(0, 223, 217, 0.4), 0 0 50px rgba(0, 223, 217, 0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
          }}
        >
          <img src={logo} alt="OpenMind AI Chat" className="w-full h-full object-contain p-3 relative z-10" />
        </Button>
        </div>
      ) : (
        <div className="w-[380px] max-w-[calc(100vw-2rem)] h-[560px] max-h-[calc(100vh-7rem)] flex flex-col rounded-2xl overflow-hidden border border-border/60 shadow-2xl bg-card/95 backdrop-blur-xl"
          style={{ boxShadow: '0 0 60px rgba(0, 223, 217, 0.15), 0 25px 50px rgba(0,0,0,0.5)' }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border/40 bg-card">
            <img src={logo} alt="OpenMind AI" className="w-8 h-8 object-contain" />
            <div className="flex-1 min-w-0">
              <p className="font-heading text-sm font-semibold text-foreground">OpenMind AI</p>
              <p className="text-xs text-muted-foreground">{language === 'pl' ? 'Doradca AI • Online' : 'AI Advisor • Online'}</p>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            data-lenis-prevent
            className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-4"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            {messages.length === 0 && (
              <div className="text-center py-8 space-y-3">
                <img src={logo} alt="" className="w-12 h-12 mx-auto opacity-60" />
                <p className="text-sm text-muted-foreground">
                  {language === 'pl' ? (
                    <>Cześć! 👋 Jestem doradcą AI od OpenMind.<br />Jak mogę Ci pomóc?</>
                  ) : (
                    <>Hi! 👋 I'm the AI advisor from OpenMind.<br />How can I help you?</>
                  )}
                </p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-muted/60 text-foreground rounded-bl-md"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <div className="prose prose-sm prose-invert max-w-none [&_a]:text-primary [&_a]:underline [&_p]:mb-2 [&_p:last-child]:mb-0">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
              <div className="flex justify-start">
                <div className="bg-muted/60 rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="px-3 py-3 border-t border-border/40 bg-card">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={language === 'pl' ? "Napisz wiadomość..." : "Type a message..."}
                rows={1}
                className="flex-1 resize-none bg-muted/40 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 max-h-24 scrollbar-thin"
                style={{ minHeight: "40px" }}
              />
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="h-10 w-10 rounded-xl bg-primary hover:bg-primary/90 shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
