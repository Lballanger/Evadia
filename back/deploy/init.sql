-- Deploy on-demenage:init to pg

BEGIN;

CREATE TABLE commune (
    code_insee INT PRIMARY KEY,
    code_departement INT,
    code_region INT,
    city_name TEXT,
    longitude FLOAT,
    latitude FLOAT,
    population INT
);

CREATE TABLE locality (
    zip_code INT PRIMARY KEY
);

CREATE TABLE commune_has_postal_code (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    commune_code_insee INT NOT NULL REFERENCES commune(code_insee) ON DELETE CASCADE,
    locality_zip_code INT NOT NULL REFERENCES locality(zip_code) ON DELETE CASCADE
);

COMMIT;
