-- Verify on-demenage:taxation_table on pg

BEGIN;

SELECT * FROM private.taxation WHERE FALSE;
SELECT * FROM private.get_taxation('83061');

ROLLBACK;
