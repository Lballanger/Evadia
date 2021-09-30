-- Deploy on-demenage:commerce_table to pg

BEGIN;

CREATE TABLE private.commerce (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT,
    coordinates POINT,
    commune_code TEXT NOT NULL REFERENCES private.commune(code_insee),
    type TEXT
);

COMMIT;
