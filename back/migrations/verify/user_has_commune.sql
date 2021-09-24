-- Verify on-demenage:user_has_commune on pg

BEGIN;

SELECT * FROM private.user_has_commune WHERE FALSE;

ROLLBACK;
