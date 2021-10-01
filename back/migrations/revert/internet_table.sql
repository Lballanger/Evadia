-- Revert on-demenage:internet_table from pg

BEGIN;

DROP TABLE private.internet;
DROP TABLE private.get_internet;

COMMIT;
