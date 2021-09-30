-- Deploy on-demenage:internet_table to pg

BEGIN;

CREATE TABLE private.internet (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    commune_code TEXT NOT NULL REFERENCES private.commune(code_insee),
	coverage INT
);

COMMIT;
