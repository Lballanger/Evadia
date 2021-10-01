-- Deploy on-demenage:internet_table to pg

BEGIN;

CREATE TABLE private.internet (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    commune_code TEXT NOT NULL REFERENCES private.commune(code_insee),
	coverage INT
);

CREATE OR REPLACE FUNCTION private.get_internet(code TEXT) RETURNS JSON AS $$
SELECT
  json_agg(
    json_build_object(
      'id',
      internet.id,
      'commune_code',
      internet.commune_code,
      'coverage',
      internet.coverage
    )
  )
FROM
  private.internet AS internet
WHERE
  internet.commune_code = code;
$$ LANGUAGE SQL STRICT;

COMMIT;
