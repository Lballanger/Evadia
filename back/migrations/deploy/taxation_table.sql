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

CREATE OR REPLACE FUNCTION private.get_taxation (code TEXT) RETURNS JSON AS $$
SELECT
  json_agg(
    json_build_object(
      'id',
      taxations.id,
      'commune_code',
      taxations.commune_code,
      'housing_tax',
      taxations.housing_tax,
      'property_tax',
      taxations.property_tax,
      'land_property_tax',
      taxations.land_property_tax,
      'year',
      taxations.year
    )
  )
FROM
  private.taxation AS taxations
WHERE
  taxations.commune_code = code;
$$ LANGUAGE SQL STRICT;

COMMIT;
