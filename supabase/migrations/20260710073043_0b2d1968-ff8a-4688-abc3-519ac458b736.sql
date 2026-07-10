
CREATE TABLE public.avatar_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id text NOT NULL DEFAULT 'openmindai',
  conversation_id text,
  name text NOT NULL DEFAULT '',
  email text NOT NULL,
  phone text NOT NULL,
  company text NOT NULL DEFAULT '',
  organization_type text NOT NULL DEFAULT '',
  interest_area text NOT NULL DEFAULT '',
  problem_description text NOT NULL DEFAULT '',
  budget_range text NOT NULL DEFAULT '',
  timeline text NOT NULL DEFAULT '',
  intent text NOT NULL DEFAULT 'lead_capture',
  consent_contact boolean NOT NULL DEFAULT false,
  consent_text_version text NOT NULL DEFAULT '2026-07-06-v1',
  consent_timestamp timestamptz NOT NULL DEFAULT now(),
  source_url text NOT NULL DEFAULT '',
  lead_score text NOT NULL DEFAULT 'cold',
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.avatar_leads TO anon, authenticated;
GRANT ALL ON public.avatar_leads TO service_role;

ALTER TABLE public.avatar_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can insert avatar leads with consent"
ON public.avatar_leads
FOR INSERT
TO anon, authenticated
WITH CHECK (
  consent_contact = true
  AND email IS NOT NULL
  AND length(email) BETWEEN 5 AND 255
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND phone IS NOT NULL
  AND length(btrim(phone)) BETWEEN 7 AND 20
  AND length(coalesce(problem_description, '')) <= 4000
);
