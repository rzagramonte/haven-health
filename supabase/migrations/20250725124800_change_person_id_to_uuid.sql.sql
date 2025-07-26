DROP TABLE IF EXISTS public.medical_visit;
DROP TABLE IF EXISTS public.appointment_booking;
DROP TABLE IF EXISTS public.patient;
DROP TABLE IF EXISTS public.address;
DROP TABLE IF EXISTS public.contact;
DROP TABLE IF EXISTS public.person;

DROP TYPE IF EXISTS public.contact_type;
DROP TYPE IF EXISTS public.user_role;

CREATE TYPE public.user_role AS ENUM (
  'patient',
  'admin',
  'provider'
);

CREATE TYPE public.contact_type AS ENUM (
  'phone',
  'email'
);

CREATE TABLE public.person (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name varchar(255),
  last_name varchar(255),
  role public.user_role,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.contact (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  person_id uuid,
  contact_type public.contact_type,
  contact_value varchar(50),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT fk_contact_person FOREIGN KEY (person_id) REFERENCES public.person(id) ON DELETE CASCADE
);

CREATE TABLE public.address (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  person_id uuid,
  streetA varchar(255),
  streetB varchar(255),
  city varchar(255),
  address_state varchar(25),
  zip_code varchar(10),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT fk_address_person FOREIGN KEY (person_id) REFERENCES public.person(id) ON DELETE CASCADE
);

CREATE TABLE public.patient (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  person_id uuid UNIQUE,
  date_of_birth date,
  sex varchar(10),
  insurance_flag boolean,
  emergency_contact json,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT fk_patient_person FOREIGN KEY (person_id) REFERENCES public.person(id) ON DELETE CASCADE
);

CREATE TABLE public.appointment_booking (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  person_id uuid,
  date_of_birth date,
  date_paid date,
  sex varchar(10),
  insurance_flag boolean,
  emergency_contact json,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT fk_appointment_patient FOREIGN KEY (person_id) REFERENCES public.person(id) ON DELETE CASCADE
);

CREATE TABLE public.medical_visit (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid,
  doctor_id uuid,
  allergies varchar[],
  prescriptions varchar[],
  summary_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  followup_needed date,
  CONSTRAINT fk_visit_patient FOREIGN KEY (patient_id) REFERENCES public.patient(id) ON DELETE CASCADE,
  CONSTRAINT fk_visit_doctor FOREIGN KEY (doctor_id) REFERENCES public.person(id) ON DELETE CASCADE
);
