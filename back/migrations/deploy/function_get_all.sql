-- Deploy on-demenage:function_get_all to pg

BEGIN;

CREATE OR REPLACE FUNCTION private.get_all(code TEXT) RETURNS TABLE (
  code_insee TEXT,
  code_departement TEXT,
  code_postal TEXT [],
  code_region TEXT,
  city_name TEXT,
  coordinates POINT,
  population INT,
  schools JSON,
  commerce JSON,
  taxation JSON,
  weather JSON,
  internet JSON,
  personal_health JSON,
  health_institution JSON
) AS $$
select
  com.*,
  private.get_schools(code) AS schools,
  private.get_commerce(code) AS commerce,
  private.get_taxation(code) AS taxations,
  private.get_weather(code) AS weather,
  private.get_internet(code) AS internet,
  private.personal_health(code) AS personal,
  private.get_health_institution(code) AS health_institution
FROM
  private.commune AS com
where
  com.code_insee = code
$$ LANGUAGE SQL STRICT;

COMMIT;
