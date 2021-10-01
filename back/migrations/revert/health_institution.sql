-- Revert on-demenage:health_institution from pg

BEGIN;

DROP TABLE private.health_institution;
DROP FUNCTION private.get_health_institution;

COMMIT;
