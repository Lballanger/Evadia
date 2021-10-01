-- Verify on-demenage:personal_health on pg

BEGIN;

SELECT * FROM private.personal_health WHERE FALSE;
SELECT * FROM private.personal_health('83061');

ROLLBACK;
