-- Deploy on-demenage:function_criteria to pg

BEGIN;

/*
 Function criteria : /api/search/criteria

 Returns a list of cities matching the criteria

*/

CREATE OR REPLACE FUNCTION private.member_criteria(json) RETURNS SETOF private.commune AS $$
	SELECT private.commune.* FROM private.commune
    -- Criterion between two population values
	WHERE population::int BETWEEN (($1->>'populationmin')::int) AND (($1->>'populationmax')::int)
	AND (CASE 
        -- Test for the presence of the code_departement key in the json
		WHEN (($1->'code_departement')::text IS NOT NULL) = true
            -- 
			THEN code_departement=($1->>'code_departement')::text
		ELSE true
		END)
		
	AND (CASE 
        -- Test for the presence of the code_region key in the json
		WHEN (($1->'code_region')::text IS NOT NULL) = true
			THEN code_region=($1->>'code_region')::text
		ELSE true
		END)

	AND (CASE
        -- Test for the presence of the type_ecole key in the json
	  	WHEN (($1->'type_ecole')::text IS NOT NULL) = true
		  	-- check if the towns have one of the schools you are looking for
		  	THEN private.commune.code_insee IN (SELECT private.school.commune_code FROM private.school WHERE private.school.type=($1->>'type_ecole')::text)
	  	ELSE true 
	  	END)
		
		AND (CASE
		-- Test for the presence of the type_commerce key in the json
		WHEN (($1->'type_personal_health')::text IS NOT NULL) = true
			THEN private.commune.code_insee IN (SELECT private.personal_health.commune_code FROM private.personal_health WHERE private.personal_health.profession=($1->>'type_personal_health')::text)
		ELSE true 
		END)
		
		AND (CASE
		-- Test for the presence of the type_commerce key in the json
		WHEN (($1->'type_health_institution')::text IS NOT NULL) = true
			THEN private.commune.code_insee IN (SELECT private.health_institution.commune_code FROM private.health_institution WHERE private.health_institution.categorie=($1->>'type_health_institution')::text)
		ELSE true 
		END)
$$ LANGUAGE SQL STRICT;

COMMIT;
