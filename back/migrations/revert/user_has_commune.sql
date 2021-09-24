-- Revert on-demenage:user_has_commune from pg

BEGIN;

DROP TABLE private.user_has_commune;

COMMIT;
