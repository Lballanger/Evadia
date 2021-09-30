-- Verify on-demenage:internet_table on pg

BEGIN;

SELECT * FROM private.internet WHERE false;

ROLLBACK;
