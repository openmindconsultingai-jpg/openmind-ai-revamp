import { useState } from "react";
import { Minimize2 } from "lucide-react";
import { Button } from "./ui/button";
import logo from '@/assets/openmind-logo.webp';

const Chatbot = () => {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isMinimized ? (
        <Button
          onClick={() => setIsMinimized(false)}
          size="lg"
          className="rounded-full w-20 h-20 shadow-2xl p-0 overflow-hidden bg-gradient-to-br from-black via-black to-black/90 hover:from-black/90 hover:via-black hover:to-black border-2 border-primary relative animate-pulse hover:animate-none transition-all before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity"
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
