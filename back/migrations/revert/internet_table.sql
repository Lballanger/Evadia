-- Revert on-demenage:internet_table from pg

BEGIN;

DROP FUNCTION private.get_internet;
DROP TABLE private.internet;

COMMIT;
