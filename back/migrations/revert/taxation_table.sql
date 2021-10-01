-- Revert on-demenage:taxation_table from pg

BEGIN;

DROP FUNCTION private.get_taxation;
DROP TABLE private.taxation;

COMMIT;
