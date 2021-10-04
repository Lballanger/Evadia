-- Verify on-demenage:function_criteria on pg

BEGIN;

-- criteria function test
SELECT * FROM private.criteria('{"populationmin": "4800","populationmax": "15000","codedepartement": "77"}');

ROLLBACK;
