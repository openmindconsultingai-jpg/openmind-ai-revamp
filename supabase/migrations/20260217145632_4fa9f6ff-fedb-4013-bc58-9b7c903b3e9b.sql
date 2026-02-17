
-- Chat conversations for persistent memory
CREATE TABLE public.chat_conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Chat messages within conversations
CREATE TABLE public.chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID NOT NULL REFERENCES public.chat_conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Public access policies (anonymous chatbot, no auth required)
CREATE POLICY "Anyone can create conversations" ON public.chat_conversations FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read own conversation by session" ON public.chat_conversations FOR SELECT USING (true);
CREATE POLICY "Anyone can update conversations" ON public.chat_conversations FOR UPDATE USING (true);

CREATE POLICY "Anyone can create messages" ON public.chat_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read messages" ON public.chat_messages FOR SELECT USING (true);

-- Index for fast lookups
CREATE INDEX idx_chat_messages_conversation ON public.chat_messages(conversation_id);
CREATE INDEX idx_chat_conversations_session ON public.chat_conversations(session_id);

-- Auto-update timestamp
CREATE TRIGGER update_chat_conversations_updated_at
  BEFORE UPDATE ON public.chat_conversations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_bookings_updated_at();
