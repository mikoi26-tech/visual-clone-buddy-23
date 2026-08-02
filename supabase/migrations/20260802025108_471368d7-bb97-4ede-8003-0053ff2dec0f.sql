CREATE TABLE public.access_keys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE,
  device_id text,
  redeemed_at timestamptz,
  revoked boolean NOT NULL DEFAULT false,
  note text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.access_keys TO service_role;
ALTER TABLE public.access_keys ENABLE ROW LEVEL SECURITY;

INSERT INTO public.access_keys (key, note) VALUES
  ('LACHY-7QK4M-2ZP9X-VD6TR-B1N8W', 'owner key'),
  ('LACHY-3XF2L-8HQ5D-KM7YV-P4T6C', 'spare key 1'),
  ('LACHY-9WB6R-T1KZ4-XN3QJ-H5M2D', 'spare key 2');