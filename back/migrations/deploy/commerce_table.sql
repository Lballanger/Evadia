-- Deploy on-demenage:commerce_table to pg

BEGIN;

CREATE TABLE private.commerce (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT,
    coordinates POINT,
    commune_code TEXT NOT NULL REFERENCES private.commune(code_insee),
    type TEXT
);

CREATE OR REPLACE FUNCTION private.get_commerce (code TEXT) RETURNS JSON AS $$
SELECT
  json_agg(
    json_build_object(
      'id',
      com.id,
      'name',
      com.name,
      'coordinates',
      com.coordinates,
      'commune_code',
      com.commune_code,
      'type',
      com.type
    )
  )
FROM
  (SELECT * FROM private.commerce AS commerce
WHERE
  commerce.commune_code = code ORDER BY RANDOM() LIMIT 50) AS com
$$ LANGUAGE SQL STRICT;

COMMIT;
