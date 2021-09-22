-- Deploy on-demenage:init to pg

BEGIN;

CREATE TABLE commune (
    code_insee TEXT PRIMARY KEY,
    code_departement TEXT,
    code_postal TEXT[],
    code_region TEXT,
    city_name TEXT,
    longitude FLOAT,
    latitude FLOAT,
    population INT
);

COMMIT;
