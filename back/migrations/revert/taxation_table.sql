-- Revert on-demenage:taxation_table from pg

BEGIN;

DROP TABLE private.taxation;

COMMIT;
