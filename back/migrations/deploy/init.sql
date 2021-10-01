-- Deploy on-demenage:init to pg

BEGIN;

CREATE SCHEMA private;

CREATE TABLE private.commune (
    code_insee TEXT PRIMARY KEY,
    code_departement TEXT,
    code_postal TEXT[],
    code_region TEXT,
    city_name TEXT,
    coordinates POINT,
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

CREATE OR REPLACE FUNCTION private.get_schools(code TEXT) RETURNS JSON AS $$
SELECT
  json_agg(
    json_build_object(
      'id',
      schools.id,
      'name',
      schools.name,
      'coordinates',
      schools.coordinates,
      'status',
      schools.status,
      'address',
      schools.address,
      'zip_code',
      schools.zip_code,
      'type',
      schools.type
    )
  )
FROM
  private.school AS schools
WHERE
  schools.commune_code = code;
$$ LANGUAGE SQL STRICT;

COMMIT;
