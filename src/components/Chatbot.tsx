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
          className="rounded-full w-20 h-20 shadow-2xl p-0 overflow-hidden bg-black hover:bg-black/90 border-2 border-primary relative
                     before:absolute before:inset-0 before:rounded-full before:border-2 before:border-primary 
                     before:animate-[ping_3s_cubic-bezier(0.4,0,0.6,1)_infinite] before:opacity-40
                     hover:shadow-[0_0_30px_rgba(0,223,217,0.5)] transition-shadow duration-300"
          style={{
            boxShadow: '0 0 20px rgba(0, 223, 217, 0.3), 0 0 40px rgba(0, 223, 217, 0.15)'
          }}
        >
          <img src={logo} alt="OpenMind AI Chat" className="w-full h-full object-contain p-3" />
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
