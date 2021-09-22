-- Verify on-demenage:init on pg

BEGIN;

SELECT * FROM private.commune WHERE false;
SELECT * FROM private.school WHERE false;

ROLLBACK;
