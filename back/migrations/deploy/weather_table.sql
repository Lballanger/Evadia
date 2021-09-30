-- Deploy on-demenage:weather_table to pg

BEGIN;

CREATE TABLE private.weather (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    commune_code TEXT NOT NULL REFERENCES private.commune(code_insee),
	coordinates POINT NOT NULL,
    temperature FLOAT,
    humidity INTEGER,
    wind FLOAT,
    date TIMESTAMPTZ
);

COMMIT;
