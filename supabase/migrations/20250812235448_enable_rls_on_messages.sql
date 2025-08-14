-- messages

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "messages_select_authenticated"
ON public.messages
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "messages_insert_authenticated"
ON public.messages
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "messages_update_authenticated"
ON public.messages
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "messages_delete_authenticated"
ON public.messages
FOR DELETE
TO authenticated
USING (true);

-- appointment_booking

ALTER TABLE public.appointment_booking ENABLE ROW LEVEL SECURITY;

CREATE POLICY "appointments_select_authenticated"
ON public.appointment_booking
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "appointments_insert_authenticated"
ON public.appointment_booking
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "appointments_update_authenticated"
ON public.appointment_booking
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "appointments_delete_authenticated"
ON public.appointment_booking
FOR DELETE
TO authenticated
USING (true);