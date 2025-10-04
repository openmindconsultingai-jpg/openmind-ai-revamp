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
          className="rounded-full w-20 h-20 shadow-2xl p-0 overflow-hidden"
        >
          <img src={logo} alt="OpenMind AI Chat" className="w-full h-full object-contain p-2" />
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
