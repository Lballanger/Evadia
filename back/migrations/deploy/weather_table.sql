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

CREATE OR REPLACE FUNCTION private.get_weather(code TEXT) RETURNS JSON AS $$
SELECT
  json_agg(
    json_build_object(
      'id',
      weather.id,
      'commune_code',
      weather.commune_code,
      'coordinates',
      weather.coordinates,
      'temperature',
      weather.temperature,
      'humidity',
      weather.humidity,
      'wind',
      weather.wind,
      'date',
      weather.date
    )
  )
FROM
  private.weather AS weather
WHERE
  weather.commune_code = code;
$$ LANGUAGE SQL STRICT;

COMMIT;
