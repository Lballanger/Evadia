-- Revert on-demenage:personal_health from pg

BEGIN;

DROP FUNCTION private.personal_health;
DROP TABLE private.personal_health;

COMMIT;
