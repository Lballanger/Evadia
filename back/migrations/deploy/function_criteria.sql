-- Deploy on-demenage:function_criteria to pg

BEGIN;

/*
 Function criteria : /api/search/criteria

 Returns a list of cities matching the criteria

*/

CREATE OR REPLACE FUNCTION private.criteria(json) RETURNS SETOF private.commune AS $$
	SELECT private.commune.* FROM private.commune JOIN private.school ON school.commune_code=private.commune.code_insee
    -- Criterion between two population values
	WHERE population::int BETWEEN (($1->>'populationmin')::int) AND (($1->>'populationmax')::int)
	AND (CASE 
        -- Test for the presence of the codedepartement key in the json
		WHEN (($1->'codedepartement')::text IS NOT NULL) = true
            -- 
			THEN code_departement=($1->>'codedepartement')::text
		ELSE true
		END)
	AND (CASE 
        -- Test for the presence of the coderegion key in the json
		WHEN (($1->'coderegion')::text IS NOT NULL) = true
			THEN code_region=($1->>'coderegion')::text
		ELSE true
		END)

	AND (CASE
        -- Test for the presence of the type_ecole key in the json
	  	WHEN (($1->'type_ecole')::text IS NOT NULL) = true
		  	THEN private.school.type=($1->>'type_ecole')::text
	  	ELSE true 
	  	END)
$$ LANGUAGE SQL STRICT;

COMMIT;
