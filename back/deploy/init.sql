-- Deploy on-demenage:init to pg

BEGIN;

CREATE TABLE commune (
    code_insee INT PRIMARY KEY,
    code_departement INT,
    code_postal INT[],
    code_region INT,
    city_name TEXT,
    longitude FLOAT,
    latitude FLOAT,
    population INT
);

COMMIT;
