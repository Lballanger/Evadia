-- Revert on-demenage:init from pg

BEGIN;

DROP TABLE commune;

COMMIT;
