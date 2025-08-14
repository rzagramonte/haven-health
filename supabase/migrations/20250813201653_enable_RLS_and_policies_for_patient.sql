ALTER TABLE public.patient ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only authenticated users can see patient records"
ON public.patient
FOR SELECT
TO authenticated
USING (true);


CREATE POLICY "Only authenticated users can insert on patient records"
ON public.patient
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Only authenticated users can update patient records"
ON public.patient
FOR UPDATE
TO authenticated
WITH CHECK (true)
