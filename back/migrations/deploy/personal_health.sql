-- Deploy on-demenage:personal_health to pg

BEGIN;

CREATE TABLE private.personal_health (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT,
    profession TEXT,
    coordinates POINT,
    commune_code TEXT NOT NULL REFERENCES private.commune(code_insee)
);

-- Function commerce table
CREATE OR REPLACE FUNCTION private.personal_health (code TEXT) RETURNS JSON AS $$
SELECT
  json_agg(
    json_build_object(
      'id',
      personal_health.id,
      'name',
      personal_health.name,
      'profession',
      personal_health.profession,
      'coordinates',
      personal_health.coordinates,
      'commune_code',
      personal_health.commune_code
    )
  )
FROM
  private.personal_health AS personal_health
WHERE
  personal_health.commune_code = code;
$$ LANGUAGE SQL STRICT;

COMMIT;
