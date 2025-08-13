ALTER TABLE public.address ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own address record"
ON public.address
FOR INSERT
TO authenticated
WITH CHECK (
    person_id IN (SELECT id FROM public.person WHERE person_uuid = auth.uid())
);

CREATE POLICY "Authenticated users only can see their own address record"
on public.address
FOR SELECT
TO authenticated
USING ( 
    person_id IN (SELECT id FROM public.person WHERE person_uuid = auth.uid())
);

CREATE POLICY "Users can only update their own addresses"
ON public.address
FOR UPDATE
TO authenticated
USING (
  person_id IN (SELECT id FROM public.person WHERE person_uuid = auth.uid())
)
WITH CHECK (
  person_id IN (SELECT id FROM public.person WHERE person_uuid = auth.uid())
);

CREATE POLICY "providers and admins can view all the addresses"
on public.address
FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1
        FROM public.person as p
        WHERE p.person_uuid = auth.uid()
        AND p.role IN ('provider','admin')
    )
);

