-- Deploy on-demenage:contact_table to pg

BEGIN;

CREATE TABLE private.contact (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  email email_type,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  seen BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()::TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW()::TIMESTAMPTZ
);

COMMIT;
