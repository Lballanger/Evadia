-- Verify on-demenage:health_institution on pg

BEGIN;

SELECT * FROM private.health_institution WHERE false;

ROLLBACK;
