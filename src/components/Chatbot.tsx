import { useState, useEffect } from "react";
import { Minimize2 } from "lucide-react";
import { Button } from "./ui/button";
import logo from '@/assets/openmind-logo.webp';

const Chatbot = () => {
  const [isMinimized, setIsMinimized] = useState(true);

  useEffect(() => {
    const hasBeenOpened = localStorage.getItem('chatbot-opened');
    
    if (!hasBeenOpened) {
      const timer = setTimeout(() => {
        setIsMinimized(false);
        localStorage.setItem('chatbot-opened', 'true');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isMinimized ? (
        <Button
          onClick={() => setIsMinimized(false)}
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
            animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'
          }}
        >
          <img src={logo} alt="OpenMind AI Chat" className="w-full h-full object-contain p-3 relative z-10" />
        </Button>
      ) : (
        <div className="w-[364px] max-w-[calc(100vw-3rem)] h-[546px] max-h-[calc(100vh-6rem)] relative">
          <Button
            onClick={() => setIsMinimized(true)}
            size="icon"
            variant="ghost"
            className="absolute -top-2 -right-2 z-10 rounded-full bg-background shadow-lg hover:bg-accent"
          >
            <Minimize2 className="w-4 h-4" />
          </Button>
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/nBYE_0MVItFepGCbIfgNo"
            width="100%"
            height="100%"
            className="rounded-lg shadow-2xl border border-border"
            frameBorder="0"
            title="OpenMind AI"
          />
        </div>
      )}
    </div>
  );
};

export default Chatbot;
