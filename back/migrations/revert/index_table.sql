-- Revert on-demenage:index_table from pg

BEGIN;

DROP INDEX private.profession_idx;

DROP INDEX private.categorie_idx;

COMMIT;
