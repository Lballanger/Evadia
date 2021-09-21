-- Verify on-demenage:init on pg

BEGIN;

SELECT * FROM commune WHERE false;
SELECT * FROM locality WHERE false;
SELECT * FROM commune_has_postal_code WHERE false;

ROLLBACK;
