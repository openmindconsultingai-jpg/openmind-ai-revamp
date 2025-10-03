const Chatbot = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 w-[400px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-6rem)]">
      <iframe
        src="https://www.chatbase.co/chatbot-iframe/nBYE_0MVItFepGCbIfgNo"
        width="100%"
        height="100%"
        className="rounded-lg shadow-2xl border border-border"
        frameBorder="0"
        title="OpenMind AI Chatbot"
      />
    </div>
  );
};

export default Chatbot;
