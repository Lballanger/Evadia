-- Deploy on-demenage:health_institution to pg

BEGIN;

CREATE TABLE private.health_institution (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    commune_code TEXT NOT NULL REFERENCES private.commune(code_insee),
	  coordinates POINT,
    categorie TEXT
);

CREATE OR REPLACE FUNCTION private.get_health_institution(code TEXT) RETURNS JSON AS $$
SELECT
  json_agg(
    json_build_object(
      'id',
      health_institution.id,
      'commune_code',
      health_institution.commune_code,
      'coordinates',
      health_institution.coordinates,
      'categorie',
      health_institution.categorie
    )
  )
FROM
  private.health_institution AS health_institution
WHERE
  health_institution.commune_code = code;
$$ LANGUAGE SQL STRICT;

COMMIT;
