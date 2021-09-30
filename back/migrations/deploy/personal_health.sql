-- Deploy on-demenage:personal_health to pg

BEGIN;

CREATE TABLE private.personal_health (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT,
    profession TEXT,
    coordinates POINT,
    commune_code TEXT NOT NULL REFERENCES private.commune(code_insee)
);

COMMIT;
