SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";

ALTER SCHEMA "public" OWNER TO "postgres";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE TYPE "public"."appt_duration" AS ENUM (
    '30',
    '20',
    '15',
    '45',
    '25'
);

ALTER TYPE "public"."appt_duration" OWNER TO "postgres";

CREATE TYPE "public"."appt_status" AS ENUM (
    'scheduled',
    'cancelled',
    'no-show',
    'late',
    'rescheduled',
    'completed'
);

ALTER TYPE "public"."appt_status" OWNER TO "postgres";

CREATE TYPE "public"."appt_type" AS ENUM (
    'General Checkup',
    'Chronic Condition Follow-Up',
    'Vaccination',
    'Mental Health Visit',
    'Sick Visit'
);

ALTER TYPE "public"."appt_type" OWNER TO "postgres";

CREATE TYPE "public"."contact_type" AS ENUM (
    'phone',
    'e-mail'
);

ALTER TYPE "public"."contact_type" OWNER TO "postgres";

CREATE TYPE "public"."role" AS ENUM (
    'patient',
    'provider',
    'admin'
);

ALTER TYPE "public"."role" OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."address" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "address_line_1" "text",
    "address_line_2" "text",
    "city_province_region" "text",
    "state" "text",
    "zip_code" "text",
    "person_id" "uuid" DEFAULT "auth"."uid"()
);

ALTER TABLE "public"."address" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."appointment" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "date_time" timestamp with time zone DEFAULT "now"() NOT NULL,
    "patient_id" "uuid" DEFAULT "auth"."uid"(),
    "doctor_id" "uuid" DEFAULT "auth"."uid"(),
    "duration" "public"."appt_duration" DEFAULT '30'::"public"."appt_duration",
    "check-in_time" timestamp with time zone,
    "status" "public"."appt_status" DEFAULT 'scheduled'::"public"."appt_status"
);

ALTER TABLE "public"."appointment" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."contact" (
    "id" "uuid" DEFAULT "auth"."uid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "value" "text",
    "type" "public"."contact_type"
);

ALTER TABLE "public"."contact" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."medical_visit" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "patient_id" "uuid" DEFAULT "auth"."uid"(),
    "provider_id" "uuid" DEFAULT "auth"."uid"(),
    "summary_notes" "text",
    "prescriptions" "text",
    "allergies" "text",
    "follow_up_date" "date" NOT NULL
);

ALTER TABLE "public"."medical_visit" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."messages" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "content" "text",
    "sender_id" "uuid" DEFAULT "auth"."uid"(),
    "recipient_id" "uuid" DEFAULT "auth"."uid"()
);
ALTER TABLE "public"."messages" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."patient" (
    "id" "uuid" DEFAULT "auth"."uid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "dob" "date",
    "sex" "text",
    "insurance" boolean,
    "emergency_contact" "jsonb"
);
ALTER TABLE "public"."patient" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."person" (
    "id" "uuid" DEFAULT "auth"."uid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "first_name" "text",
    "last_name" "text",
    "role" "public"."role"
);
ALTER TABLE "public"."person" OWNER TO "postgres";

ALTER TABLE ONLY "public"."address"
    ADD CONSTRAINT "address_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."appointment"
    ADD CONSTRAINT "appointment_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."contact"
    ADD CONSTRAINT "contact_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."medical_visit"
    ADD CONSTRAINT "medical_visit_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."messages"
    ADD CONSTRAINT "messages_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."patient"
    ADD CONSTRAINT "patient_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."person"
    ADD CONSTRAINT "person_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."address"
    ADD CONSTRAINT "address_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "public"."person"("id");

ALTER TABLE ONLY "public"."appointment"
    ADD CONSTRAINT "appointment_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "public"."person"("id");

ALTER TABLE ONLY "public"."appointment"
    ADD CONSTRAINT "appointment_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "public"."person"("id");

ALTER TABLE ONLY "public"."contact"
    ADD CONSTRAINT "contact_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."person"("id");

ALTER TABLE ONLY "public"."medical_visit"
    ADD CONSTRAINT "medical_visit_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "public"."person"("id");

ALTER TABLE ONLY "public"."medical_visit"
    ADD CONSTRAINT "medical_visit_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "public"."person"("id");

ALTER TABLE ONLY "public"."messages"
    ADD CONSTRAINT "messages_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "public"."person"("id");

ALTER TABLE ONLY "public"."messages"
    ADD CONSTRAINT "messages_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "public"."person"("id");

ALTER TABLE ONLY "public"."patient"
    ADD CONSTRAINT "patient_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."person"("id");

/*
ALTER TABLE "public"."address" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."appointment" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."contact" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."medical_visit" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."messages" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."patient" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."person" ENABLE ROW LEVEL SECURITY;
*/

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

REVOKE USAGE ON SCHEMA "public" FROM PUBLIC;

RESET ALL;
