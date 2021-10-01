-- Revert on-demenage:init from pg

BEGIN;

DROP FUNCTION private.get_schools(code TEXT);
DROP TABLE private.school;
DROP TABLE private.commune;

DROP SCHEMA private;

COMMIT;
