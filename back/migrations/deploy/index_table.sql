-- Deploy on-demenage:index_table to pg

BEGIN;

CREATE INDEX profession_idx ON private.personal_health (profession);

CREATE INDEX categorie_idx ON private.health_institution (categorie);

COMMIT;
