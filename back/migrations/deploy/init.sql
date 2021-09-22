-- Deploy on-demenage:init to pg

BEGIN;

CREATE SCHEMA private;

CREATE TABLE private.commune (
    code_insee TEXT PRIMARY KEY,
    code_departement TEXT,
    code_postal TEXT[],
    code_region TEXT,
    city_name TEXT,
    longitude FLOAT,
    latitude FLOAT,
    population INT
);

CREATE TABLE private.school (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT,
    coordinates POINT,
    commune_code TEXT NOT NULL REFERENCES private.commune(code_insee),
    status TEXT,
    address TEXT,
    zip_code TEXT,
    type TEXT
);

COMMIT;
