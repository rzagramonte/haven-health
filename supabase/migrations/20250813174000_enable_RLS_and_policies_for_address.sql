ALTER TABLE public.address ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can insert/create any address"
ON public.address
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can see all addresses"
ON public.address
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can update any address"
ON public.address
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);
