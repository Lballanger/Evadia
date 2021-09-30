-- Deploy on-demenage:health_institution to pg

BEGIN.

CREATE TABLE private.health_institution (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    commune_code TEXT NOT NULL REFERENCES private.commune(code_insee),
	coordinates POINT NOT NULL,
    categorie TEXT
);

COMMIT;
