-- Revert on-demenage:contact_table from pg

BEGIN;

DROP TABLE private.contact;

COMMIT;
