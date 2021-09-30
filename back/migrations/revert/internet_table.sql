-- Revert on-demenage:internet_table from pg

BEGIN;

DROP TABLE private.internet;

COMMIT;
