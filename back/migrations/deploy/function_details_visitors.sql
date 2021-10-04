-- Deploy on-demenage:function_details_visitors to pg

BEGIN;

CREATE OR REPLACE FUNCTION private.details_visitors(code TEXT) RETURNS TABLE (
  code_insee TEXT,
  code_departement TEXT,
  code_postal TEXT [],
  code_region TEXT,
  city_name TEXT,
  coordinates POINT,
  population INT,
  schools JSON,
  commerce JSON,
  internet JSON,
  health_institution JSON
) AS $$
select
  com.*,
  private.get_schools(code) AS schools,
  private.get_commerce(code) AS commerce,
  private.get_internet(code) AS internet,
  private.get_health_institution(code) AS health_institution
FROM
  private.commune AS com
where
  com.code_insee = code
$$ LANGUAGE SQL STRICT;

COMMIT;
