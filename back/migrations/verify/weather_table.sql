-- Verify on-demenage:weather_table on pg

BEGIN;

SELECT * FROM private.weather WHERE FALSE;
SELECT * FROM private.get_weather('83061');

ROLLBACK;
