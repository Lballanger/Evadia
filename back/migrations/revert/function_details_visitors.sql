-- Revert on-demenage:function_details_visitors from pg

BEGIN;

DROP FUNCTION private.details_visitors;

COMMIT;
