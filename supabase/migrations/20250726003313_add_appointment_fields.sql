CREATE TYPE public.appointment_type_enums AS ENUM (
  'General Checkup',
  'Chronic Condition Follow-Up',
  'Vaccination & Immunization',
  'Mental Health Consultation'
);

ALTER TABLE public.appointment_booking
ADD COLUMN appointment_type public.appointment_type_enums;

ALTER TABLE public.appointment_booking
ADD COLUMN appointment_time timestamptz;

CREATE TYPE public.appointment_status_enum AS ENUM(
  'scheduled',
  'completed',
  'canceled',
  'no-show'
);

ALTER TABLE public.appointment_booking
ADD COLUMN status public.appointment_status_enum DEFAULT 'scheduled';
