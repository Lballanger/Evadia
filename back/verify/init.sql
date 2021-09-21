-- Verify on-demenage:init on pg

BEGIN;

SELECT * FROM commune WHERE false;

ROLLBACK;
