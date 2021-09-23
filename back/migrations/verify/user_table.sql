-- Verify on-demenage:user_table on pg

BEGIN;

INSERT INTO private."user" (email, lastname, firstname, password)
VALUES ('TEST.TEST@gmail.test', 'MyLastname', 'MyFirstname', 'Super');

ROLLBACK;
