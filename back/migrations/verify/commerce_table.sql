-- Verify on-demenage:commerce_table on pg

BEGIN;

SELECT * FROM private.commerce WHERE FALSE;
SELECT * FROM private.get_commerce('');

ROLLBACK;
