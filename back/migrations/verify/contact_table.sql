-- Verify on-demenage:contact_table on pg

BEGIN;

INSERT INTO private.contact (name, email, subject, message) VALUES ('Germain', 'test@test.com', 'Signalement d''une erreur', 'Un message pour signler une erreur dans l''application');
SELECT * FROM private.contact WHERE false;

ROLLBACK;
