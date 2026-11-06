CREATE TABLE public.agenda_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  telefone TEXT NOT NULL,
  tipo_producao TEXT NOT NULL,
  local_desejado TEXT NOT NULL,
  horario TEXT NOT NULL,
  data_show DATE NOT NULL,
  mensagem TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.agenda_requests TO anon;
GRANT INSERT ON public.agenda_requests TO authenticated;
GRANT SELECT ON public.agenda_requests TO authenticated;
GRANT ALL ON public.agenda_requests TO service_role;

ALTER TABLE public.agenda_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an agenda request"
  ON public.agenda_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Signed-in users can read agenda requests"
  ON public.agenda_requests FOR SELECT
  TO authenticated
  USING (true);