-- Verify on-demenage:init on pg

BEGIN;

SELECT * FROM private.commune WHERE false;
SELECT * FROM private.school WHERE false;
SELECT * FROM private.get_schools('97307');

ROLLBACK;
