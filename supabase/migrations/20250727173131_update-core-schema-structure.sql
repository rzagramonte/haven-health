create type "public"."appointment_status" as enum ('scheduled', 'completed', 'canceled', 'no-show');

create type "public"."appointment_type" as enum ('General Checkup', 'Chronic Condition Follow-Up', 'Vaccination', 'Mental Health Visit', 'Sick Visit');

alter table "public"."address" drop constraint "fk_address_person";

alter table "public"."appointment_booking" drop constraint "fk_appointment_patient";

alter table "public"."contact" drop constraint "fk_contact_person";

alter table "public"."medical_visit" drop constraint "fk_visit_doctor";

alter table "public"."medical_visit" drop constraint "fk_visit_patient";

alter table "public"."patient" drop constraint "fk_patient_person";

alter table "public"."patient" drop constraint "patient_person_id_key";

drop index if exists "public"."patient_person_id_key";

create table "public"."messages" (
    "id" uuid not null default gen_random_uuid(),
    "sender_id" uuid default auth.uid(),
    "recipient_id" uuid default auth.uid(),
    "message_text" text,
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."messages" enable row level security;

alter table "public"."address" drop column "address_state";

alter table "public"."address" drop column "streeta";

alter table "public"."address" drop column "streetb";

alter table "public"."address" add column "address_line_1" text;

alter table "public"."address" add column "address_line_2" text;

alter table "public"."address" add column "state_province_region" text;

alter table "public"."address" alter column "city" set data type text using "city"::text;

alter table "public"."address" alter column "id" set default gen_random_uuid();

alter table "public"."address" alter column "id" drop identity;

alter table "public"."address" alter column "id" set data type uuid using "id"::uuid;

alter table "public"."address" alter column "person_id" set not null;

alter table "public"."address" alter column "person_id" set data type uuid using "person_id"::uuid;

alter table "public"."address" alter column "zip_code" set data type text using "zip_code"::text;

alter table "public"."address" enable row level security;

alter table "public"."appointment_booking" drop column "appointment_time";

alter table "public"."appointment_booking" drop column "date_of_birth";

alter table "public"."appointment_booking" drop column "emergency_contact";

alter table "public"."appointment_booking" drop column "sex";

alter table "public"."appointment_booking" add column "appointment_date_time" timestamp with time zone;

alter table "public"."appointment_booking" add column "doctor_id" uuid not null default auth.uid();

alter table "public"."appointment_booking" alter column "appointment_type" set data type appointment_type using "appointment_type"::text::appointment_type;

alter table "public"."appointment_booking" alter column "date_paid" set data type timestamp with time zone using "date_paid"::timestamp with time zone;

alter table "public"."appointment_booking" alter column "id" set default gen_random_uuid();

alter table "public"."appointment_booking" alter column "id" drop identity;

alter table "public"."appointment_booking" alter column "id" set data type uuid using "id"::uuid;

alter table "public"."appointment_booking" alter column "person_id" set default auth.uid();

alter table "public"."appointment_booking" alter column "person_id" set not null;

alter table "public"."appointment_booking" alter column "person_id" set data type uuid using "person_id"::uuid;

alter table "public"."appointment_booking" alter column "status" set default 'scheduled'::appointment_status;

alter table "public"."appointment_booking" alter column "status" set data type appointment_status using "status"::text::appointment_status;

alter table "public"."appointment_booking" enable row level security;

alter table "public"."contact" alter column "id" set default gen_random_uuid();

alter table "public"."contact" alter column "id" drop identity;

alter table "public"."contact" alter column "id" set data type uuid using "id"::uuid;

alter table "public"."contact" alter column "person_id" set default gen_random_uuid();

alter table "public"."contact" alter column "person_id" set not null;

alter table "public"."contact" alter column "person_id" set data type uuid using "person_id"::uuid;

alter table "public"."contact" enable row level security;

alter table "public"."medical_visit" alter column "doctor_id" set default auth.uid();

alter table "public"."medical_visit" alter column "doctor_id" set not null;

alter table "public"."medical_visit" alter column "doctor_id" set data type uuid using "doctor_id"::uuid;

alter table "public"."medical_visit" alter column "id" set default gen_random_uuid();

alter table "public"."medical_visit" alter column "id" drop identity;

alter table "public"."medical_visit" alter column "id" set data type uuid using "id"::uuid;

alter table "public"."medical_visit" alter column "patient_id" set default auth.uid();

alter table "public"."medical_visit" alter column "patient_id" set not null;

alter table "public"."medical_visit" alter column "patient_id" set data type uuid using "patient_id"::uuid;

alter table "public"."medical_visit" enable row level security;

alter table "public"."patient" drop column "person_id";

alter table "public"."patient" alter column "id" set default auth.uid();

alter table "public"."patient" alter column "id" drop identity;

alter table "public"."patient" alter column "id" set data type uuid using "id"::uuid;

alter table "public"."patient" alter column "sex" set data type text using "sex"::text;

alter table "public"."patient" enable row level security;

alter table "public"."person" alter column "first_name" set data type text using "first_name"::text;

alter table "public"."person" alter column "id" set default auth.uid();

alter table "public"."person" alter column "id" drop identity;

alter table "public"."person" alter column "id" set data type uuid using "id"::uuid;

alter table "public"."person" alter column "last_name" set data type text using "last_name"::text;

alter table "public"."person" enable row level security;

drop type "public"."appointment_status_enum";

drop type "public"."appointment_type_enums";

CREATE UNIQUE INDEX address_idd_key ON public.address USING btree (id);

CREATE UNIQUE INDEX address_person_id_key ON public.address USING btree (person_id);

CREATE UNIQUE INDEX appointment_booking_doctor_id_key ON public.appointment_booking USING btree (doctor_id);

CREATE UNIQUE INDEX appointment_booking_idd_key ON public.appointment_booking USING btree (id);

CREATE UNIQUE INDEX appointment_booking_person_id_key ON public.appointment_booking USING btree (person_id);

CREATE UNIQUE INDEX contact_idd_key ON public.contact USING btree (id);

CREATE UNIQUE INDEX contact_person_id_key ON public.contact USING btree (person_id);

CREATE UNIQUE INDEX medical_visit_doctor_id_key ON public.medical_visit USING btree (doctor_id);

CREATE UNIQUE INDEX medical_visit_id_1_key ON public.medical_visit USING btree (id);

CREATE UNIQUE INDEX medical_visit_patient_idd_key ON public.medical_visit USING btree (patient_id);

CREATE UNIQUE INDEX messages_pkey ON public.messages USING btree (id);

CREATE UNIQUE INDEX patient_id_1_key ON public.patient USING btree (id);

CREATE UNIQUE INDEX person_id_key ON public.person USING btree (id);

alter table "public"."messages" add constraint "messages_pkey" PRIMARY KEY using index "messages_pkey";

alter table "public"."address" add constraint "address_idd_key" UNIQUE using index "address_idd_key";

alter table "public"."address" add constraint "address_person_id_fkey" FOREIGN KEY (person_id) REFERENCES person(id) not valid;

alter table "public"."address" validate constraint "address_person_id_fkey";

alter table "public"."address" add constraint "address_person_id_key" UNIQUE using index "address_person_id_key";

alter table "public"."appointment_booking" add constraint "appointment_booking_doctor_id_fkey" FOREIGN KEY (doctor_id) REFERENCES person(id) not valid;

alter table "public"."appointment_booking" validate constraint "appointment_booking_doctor_id_fkey";

alter table "public"."appointment_booking" add constraint "appointment_booking_doctor_id_key" UNIQUE using index "appointment_booking_doctor_id_key";

alter table "public"."appointment_booking" add constraint "appointment_booking_idd_key" UNIQUE using index "appointment_booking_idd_key";

alter table "public"."appointment_booking" add constraint "appointment_booking_person_id_fkey" FOREIGN KEY (person_id) REFERENCES person(id) not valid;

alter table "public"."appointment_booking" validate constraint "appointment_booking_person_id_fkey";

alter table "public"."appointment_booking" add constraint "appointment_booking_person_id_key" UNIQUE using index "appointment_booking_person_id_key";

alter table "public"."contact" add constraint "contact_idd_key" UNIQUE using index "contact_idd_key";

alter table "public"."contact" add constraint "contact_person_id_fkey" FOREIGN KEY (person_id) REFERENCES person(id) not valid;

alter table "public"."contact" validate constraint "contact_person_id_fkey";

alter table "public"."contact" add constraint "contact_person_id_key" UNIQUE using index "contact_person_id_key";

alter table "public"."medical_visit" add constraint "medical_visit_doctor_id_fkey" FOREIGN KEY (doctor_id) REFERENCES person(id) not valid;

alter table "public"."medical_visit" validate constraint "medical_visit_doctor_id_fkey";

alter table "public"."medical_visit" add constraint "medical_visit_doctor_id_key" UNIQUE using index "medical_visit_doctor_id_key";

alter table "public"."medical_visit" add constraint "medical_visit_id_1_key" UNIQUE using index "medical_visit_id_1_key";

alter table "public"."medical_visit" add constraint "medical_visit_patient_id_fkey" FOREIGN KEY (patient_id) REFERENCES person(id) not valid;

alter table "public"."medical_visit" validate constraint "medical_visit_patient_id_fkey";

alter table "public"."medical_visit" add constraint "medical_visit_patient_idd_key" UNIQUE using index "medical_visit_patient_idd_key";

alter table "public"."messages" add constraint "messages_recipient_id_fkey" FOREIGN KEY (recipient_id) REFERENCES person(id) not valid;

alter table "public"."messages" validate constraint "messages_recipient_id_fkey";

alter table "public"."messages" add constraint "messages_sender_id_fkey" FOREIGN KEY (sender_id) REFERENCES person(id) not valid;

alter table "public"."messages" validate constraint "messages_sender_id_fkey";

alter table "public"."patient" add constraint "patient_id_1_key" UNIQUE using index "patient_id_1_key";

alter table "public"."patient" add constraint "patient_id_fkey" FOREIGN KEY (id) REFERENCES person(id) not valid;

alter table "public"."patient" validate constraint "patient_id_fkey";

alter table "public"."person" add constraint "person_id_key" UNIQUE using index "person_id_key";

grant delete on table "public"."messages" to "anon";

grant insert on table "public"."messages" to "anon";

grant references on table "public"."messages" to "anon";

grant select on table "public"."messages" to "anon";

grant trigger on table "public"."messages" to "anon";

grant truncate on table "public"."messages" to "anon";

grant update on table "public"."messages" to "anon";

grant delete on table "public"."messages" to "authenticated";

grant insert on table "public"."messages" to "authenticated";

grant references on table "public"."messages" to "authenticated";

grant select on table "public"."messages" to "authenticated";

grant trigger on table "public"."messages" to "authenticated";

grant truncate on table "public"."messages" to "authenticated";

grant update on table "public"."messages" to "authenticated";

grant delete on table "public"."messages" to "service_role";

grant insert on table "public"."messages" to "service_role";

grant references on table "public"."messages" to "service_role";

grant select on table "public"."messages" to "service_role";

grant trigger on table "public"."messages" to "service_role";

grant truncate on table "public"."messages" to "service_role";

grant update on table "public"."messages" to "service_role";


