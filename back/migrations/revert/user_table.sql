-- Revert on-demenage:user_table from pg

BEGIN;

DROP TABLE private."user";

DROP DOMAIN email_type;
DROP EXTENSION citext;

COMMIT;
