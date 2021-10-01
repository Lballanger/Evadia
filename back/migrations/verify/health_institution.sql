-- Verify on-demenage:health_institution on pg

BEGIN;

SELECT * FROM private.health_institution WHERE false;
SELECT * FROM private.get_health_institution('83061');

ROLLBACK;
