-- DROP date_of_birth, sex, emergency_contact, insurance_flag from appointment_booking

ALTER TABLE appointment_booking
DROP COLUMN date_of_birth,
DROP COLUMN sex,
DROP COLUMN emergency_contact,
DROP COLUMN insurance_flag;
