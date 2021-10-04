-- Verify on-demenage:function_details_visitors on pg

BEGIN;

select * from private.details_visitors('97307');


ROLLBACK;
