-- Revert on-demenage:personal_health from pg

BEGIN;

DROP TABLE private.personal_health;

COMMIT;
