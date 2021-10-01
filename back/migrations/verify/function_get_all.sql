-- Verify on-demenage:function_get_all on pg

BEGIN;

select * from private.get_all('97307');

ROLLBACK;
