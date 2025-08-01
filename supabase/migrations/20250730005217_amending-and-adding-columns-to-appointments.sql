-- 1. Add the provider_id column
ALTER TABLE public.appointment_booking
ADD COLUMN provider_id integer NOT NULL REFERENCES public.person(id);

-- 2. Drop the old patient constraint (if it exists)
ALTER TABLE public.appointment_booking
DROP CONSTRAINT IF EXISTS fk_appointment_patient;

-- 3. Rename person_id to patient_id
ALTER TABLE public.appointment_booking
RENAME COLUMN person_id TO patient_id;

-- 4. Add a foreign key constraint for the renamed column (if needed)
ALTER TABLE public.appointment_booking
ADD CONSTRAINT fk_appointment_patient FOREIGN KEY (patient_id) REFERENCES public.patient(id);

-- 5. Make the column NOT NULL
ALTER TABLE public.appointment_booking
ALTER COLUMN patient_id SET NOT NULL;
