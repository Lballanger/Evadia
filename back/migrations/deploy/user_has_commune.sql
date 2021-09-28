-- Deploy on-demenage:user_has_commune to pg

BEGIN;

CREATE TABLE private.user_has_commune(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    commune_code_insee TEXT NOT NULL REFERENCES private.commune(code_insee),
    user_id INT NOT NULL REFERENCES private."user"(id),
    is_favorite BOOLEAN NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMIT;
