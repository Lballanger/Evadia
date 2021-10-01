-- Revert on-demenage:commerce_table from pg

BEGIN;

DROP TABLE private.commerce;
DROP FUNCTION private.get_commerce;

COMMIT;
