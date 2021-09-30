-- Revert on-demenage:commerce_table from pg

BEGIN;

DROP TABLE private.commerce;

COMMIT;
