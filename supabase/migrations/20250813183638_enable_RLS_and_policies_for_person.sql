
ALTER TABLE public.person ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only insert their own person record when signing up"
ON public.person
FOR INSERT
TO authenticated
WITH CHECK ((select auth.uid()) = person_uuid);

CREATE POLICY "Authenticated users only can see their own person record"
on public.person
FOR SELECT
TO authenticated
USING ((select auth.uid()) = person_uuid);

CREATE POLICY "only providers can see all the person records"
on public.person
FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1
        FROM public.person as p
        WHERE p.person_uuid = auth.uid()
        AND p.role = 'provider'
    )
);

CREATE POLICY "Users can only update their own person record"
ON public.person
FOR UPDATE
TO authenticated
USING ((select auth.uid()) = person_uuid)
WITH CHECK ((select auth.uid()) = person_uuid);

