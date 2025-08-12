CREATE TYPE message_context AS ENUM (
  'general',
  'support',
  'appointment'
);

CREATE TYPE message_type AS ENUM (
  'general',
  'billing'
);

ALTER TABLE messages
  ADD COLUMN context message_context NOT NULL DEFAULT 'general',
  ADD COLUMN message_type message_type DEFAULT 'general',
  ADD COLUMN appointment_id INTEGER REFERENCES appointment_booking(id) ON DELETE SET NULL;