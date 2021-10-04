-- Revert on-demenage:function_criteria from pg

BEGIN;

DROP FUNCTION private.member_criteria;

COMMIT;
