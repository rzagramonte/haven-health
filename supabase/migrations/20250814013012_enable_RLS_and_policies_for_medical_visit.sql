ALTER TABLE public.medical_visit ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can insert any visit"
ON public.medical_visit
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can see all visits"
ON public.medical_visit
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can update any visit"
ON public.medical_visit
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);