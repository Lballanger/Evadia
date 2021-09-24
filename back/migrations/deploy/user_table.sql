-- Deploy on-demenage:user_table to pg

BEGIN;

-- citext is a built-in extension from Postgresql, it's insensitive
-- In this case we consider that 'test@test.com' is the same user than 'tEST@TesT.CoM'
CREATE EXTENSION citext;
CREATE DOMAIN email_type AS citext
  CHECK ( value ~ '^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$' );

CREATE TABLE private."user" (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email email_type UNIQUE,
  firstname TEXT NOT NULL,
  lastname TEXT NOT NULL,
  password TEXT NOT NULL,
  city TEXT NOT NULL REFERENCES private.commune(code_insee),
  role TEXT NOT NULL DEFAULT 'user',
  email_verified_at TIMESTAMPTZ DEFAULT NULL
);

COMMIT;
