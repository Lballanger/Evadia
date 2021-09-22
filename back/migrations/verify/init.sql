-- Verify on-demenage:init on pg

BEGIN;

SELECT * FROM private.commune WHERE false;

ROLLBACK;
