require('dotenv').config();
// eslint-disable-next-line import/no-extraneous-dependencies
const fetch = require('node-fetch');
const db = require('../../app/database');
// const dataJSON = require('/mnt/42BA76D5BA76C4C7/Téléchargements/fr-esr-referentiel-geographique.json')

const getCommune = async () => {
  const result = await fetch(
    'https://opendata.paris.fr/api/records/1.0/search/?dataset=arrondissements&q=&rows=66&facet=c_ar&facet=c_arinsee&facet=l_ar'
  );
  return result.json();
};

const insertBDD = async () => {
  try {
    const data = await getCommune();
    for (const value of data.records) {
      // console.log(value.fields.c_arinsee-100);
      const coordinates = value.fields.geom_x_y.map((coord) =>
        parseFloat(coord)
      );
      // console.log(coordinates);
      // fields.l_ar -> nom
      // fields.c_arinsee -> code insee
      // coordinates
      const postal = value.fields.c_arinsee - 100;
      await db.query(
        `INSERT INTO private.commune (
                        code_insee,
                        city_name,
                        coordinates,
                        code_postal
                              ) VALUES ($1, $2, $3, $4);`,
        [
          value.fields.c_arinsee,
          value.fields.l_ar,
          `(${coordinates})`,
          `{${postal}}`,
        ]
      );
    }
  } catch (error) {
    console.log(error);
  }
};

insertBDD();
