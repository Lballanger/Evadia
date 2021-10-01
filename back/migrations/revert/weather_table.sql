-- Revert on-demenage:weather_table from pg

BEGIN;

DROP FUNCTION private.get_weather;
DROP TABLE private.weather;

COMMIT;
