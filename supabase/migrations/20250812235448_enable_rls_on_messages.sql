-- messages

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "messages_select_authenticated"
on public.messages
FOR SELECT
USING (auth.role() = 'authenticated')

CREATE POLICY "messages_insert_authenticated"
ON public.messages
FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- appointment_booking

ALTER TABLE public.appointment_booking ENABLE ROW LEVEL SECURITY;

CREATE POLICY "appointments_select_authenticated"
ON public.appointment_booking
FOR SELECT
USING (auth.role() = 'authenticated');

CREATE POLICY "appointments_insert_authenticated"
ON public.appointment_booking
FOR INSERT
WITH CHECK (auth.role() = 'authenticated');