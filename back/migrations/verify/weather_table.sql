-- Verify on-demenage:weather_table on pg

BEGIN;

SELECT * FROM private.weather WHERE FALSE;

ROLLBACK;
