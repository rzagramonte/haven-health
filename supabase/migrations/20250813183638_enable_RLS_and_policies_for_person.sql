
ALTER TABLE public.person ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public users can insert on person records"
ON public.person
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Only authenticated users can select person records"
on public.person
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Only authenticated users can update person records"
ON public.person
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);
