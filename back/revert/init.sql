-- Revert on-demenage:init from pg

BEGIN;

DROP TABLE commune_has_postal_code;

DROP TABLE locality;

DROP TABLE commune;

COMMIT;
