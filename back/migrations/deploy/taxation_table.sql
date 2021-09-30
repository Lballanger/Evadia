-- Deploy on-demenage:taxation_table to pg

BEGIN;

CREATE TABLE private.taxation (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    commune_code TEXT NOT NULL REFERENCES private.commune(code_insee),
    housing_tax TEXT,
    property_tax TEXT,
    land_property_tax TEXT,
    year TEXT
);

COMMIT;
