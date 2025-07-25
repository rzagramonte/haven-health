ALTER TABLE public.contact DROP CONSTRAINT fk_contact_person;
ALTER TABLE public.address DROP CONSTRAINT fk_address_person;
ALTER TABLE public.patient DROP CONSTRAINT fk_patient_person;
ALTER TABLE public.appointment_booking DROP CONSTRAINT fk_appointment_patient;
ALTER TABLE public.medical_visit DROP CONSTRAINT fk_visit_doctor;

ALTER TABLE public.contact ALTER COLUMN person_id TYPE uuid;
ALTER TABLE public.address ALTER COLUMN person_id TYPE uuid;
ALTER TABLE public.patient ALTER COLUMN person_id TYPE uuid;
ALTER TABLE public.appointment_booking ALTER COLUMN person_id TYPE uuid;
ALTER TABLE public.medical_visit ALTER COLUMN doctor_id TYPE uuid;

ALTER TABLE public.person
  ALTER COLUMN id DROP DEFAULT,
  ALTER COLUMN id TYPE uuid,
  ALTER COLUMN id SET NOT NULL;

ALTER TABLE public.contact
  ADD CONSTRAINT fk_contact_person FOREIGN KEY (person_id) REFERENCES public.person (id) ON DELETE CASCADE;

ALTER TABLE public.address
  ADD CONSTRAINT fk_address_person FOREIGN KEY (person_id) REFERENCES public.person (id) ON DELETE CASCADE;

ALTER TABLE public.patient
  ADD CONSTRAINT fk_patient_person FOREIGN KEY (person_id) REFERENCES public.person (id) ON DELETE CASCADE;

ALTER TABLE public.appointment_booking
  ADD CONSTRAINT fk_appointment_patient FOREIGN KEY (person_id) REFERENCES public.person (id) ON DELETE CASCADE;

ALTER TABLE public.medical_visit
  ADD CONSTRAINT fk_visit_doctor FOREIGN KEY (doctor_id) REFERENCES public.person (id) ON DELETE CASCADE;

ALTER TABLE public.person
  ADD CONSTRAINT fk_user FOREIGN KEY (id) REFERENCES auth.users (id) ON DELETE CASCADE;