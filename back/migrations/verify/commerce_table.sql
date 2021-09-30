-- Verify on-demenage:commerce_table on pg

BEGIN;

SELECT * FROM private.commerce WHERE FALSE;

ROLLBACK;
