-- Revert on-demenage:init from pg

BEGIN;

DROP TABLE private.commune;

DROP SCHEMA private;

COMMIT;
