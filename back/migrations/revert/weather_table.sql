-- Revert on-demenage:weather_table from pg

BEGIN;

DROP TABLE private.weather;

COMMIT;
