-- Revert on-demenage:init from pg

BEGIN;


DROP TABLE private.school;
DROP TABLE private.commune;

DROP SCHEMA private;

COMMIT;
