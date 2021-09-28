-- Verify on-demenage:user_table on pg

BEGIN;

SELECT * FROM private.user WHERE false;

ROLLBACK;
