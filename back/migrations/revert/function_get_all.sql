-- Revert on-demenage:function_get_all from pg

BEGIN;

DROP FUNCTION private.get_all;

COMMIT;
