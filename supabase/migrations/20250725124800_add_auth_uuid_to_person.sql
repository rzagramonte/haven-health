ALTER TABLE public.person
ADD COLUMN person_uuid uuid 
REFERENCES auth.users(id) 
ON DELETE CASCADE 
UNIQUE;