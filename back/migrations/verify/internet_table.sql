-- Verify on-demenage:internet_table on pg

BEGIN;

SELECT * FROM private.internet WHERE false;
SELECT * FROM private.get_internet('97307');

ROLLBACK;
