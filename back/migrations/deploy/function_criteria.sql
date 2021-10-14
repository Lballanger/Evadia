-- Deploy on-demenage:function_criteria to pg

BEGIN;

/*
 Function criteria : /api/search/criteria

 Returns a list of cities matching the criteria

*/

CREATE OR REPLACE FUNCTION private.criteria(json) RETURNS SETOF private.commune AS $$
	SELECT private.commune.* FROM private.commune
    -- Criterion between two population values
	WHERE population::int BETWEEN (($1->>'populationmin')::int) AND (($1->>'populationmax')::int)
	AND (CASE 
        -- Test for the presence of the code_departement key and array in the json
		WHEN (($1->'code_departement')::text IS NOT NULL) = true AND (json_typeof($1->'code_departement')::text) = 'array'
			THEN code_departement IN (SELECT json_array_elements_text($1->'code_departement'))
		ELSE true
		END)
	AND (CASE 
        -- Test for the presence of the code_region key and array in the json
		WHEN (($1->'code_region')::text IS NOT NULL) = true AND (json_typeof($1->'code_region')::text) = 'array'
			THEN code_region IN (SELECT json_array_elements_text($1->'code_region'))
		ELSE true
		END)
	AND (CASE 
        -- Test for the presence of the type_ecole key and array in the json
	  	WHEN (($1->'type_ecole')::text IS NOT NULL) = true AND (json_typeof($1->'type_ecole')::text) = 'array'
		  	-- check if the towns have one of the schools you are looking for
		  	THEN private.commune.code_insee IN (SELECT private.school.commune_code FROM private.school WHERE LOWER(private.school.type) IN (SELECT json_array_elements_text($1->'type_ecole')))
	  	ELSE true 
	  	END)
		AND (CASE
		-- Test for the presence of the type_commerce key and array in the json
		WHEN (($1->'type_personal_health')::text IS NOT NULL) = true AND (json_typeof($1->'type_personal_health')::text) = 'array'
			THEN private.commune.code_insee IN (SELECT private.personal_health.commune_code FROM private.personal_health WHERE LOWER(private.personal_health.profession) IN (SELECT json_array_elements_text($1->'type_personal_health')))
		ELSE true 
		END)
		AND (CASE
		-- Test for the presence of the type_commerce key and array in the json
		WHEN (($1->'type_health_institution')::text IS NOT NULL) = true AND (json_typeof($1->'type_health_institution')::text) = 'array'
			THEN private.commune.code_insee IN (SELECT private.health_institution.commune_code FROM private.health_institution WHERE LOWER(private.health_institution.categorie) IN (SELECT json_array_elements_text($1->'type_health_institution')))
		ELSE true 
		END)
$$ LANGUAGE SQL STRICT;

COMMIT;
