-- Verify on-demenage:taxation_table on pg

BEGIN;

SELECT * FROM private.taxation WHERE FALSE;

ROLLBACK;
