-- Verify on-demenage:index_table on pg

BEGIN;

SELECT * FROM private.health_institution WHERE FALSE;

SELECT * FROM private.personal_health WHERE FALSE;

ROLLBACK;
