
-- Remove overly permissive SELECT policies
DROP POLICY IF EXISTS "Anyone can read messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Anyone can read own conversation by session" ON public.chat_conversations;

-- Remove overly permissive UPDATE policy
DROP POLICY IF EXISTS "Anyone can update conversations" ON public.chat_conversations;

-- Block all anon/authenticated reads (edge functions use service role and bypass RLS)
CREATE POLICY "No public read access to messages"
ON public.chat_messages
FOR SELECT
USING (false);

CREATE POLICY "No public read access to conversations"
ON public.chat_conversations
FOR SELECT
USING (false);

-- No public update access
CREATE POLICY "No public update access to conversations"
ON public.chat_conversations
FOR UPDATE
USING (false);
