// eslint-disable-next-line import/no-extraneous-dependencies
const StreamArray = require('stream-json/streamers/StreamArray');
const { Writable } = require('stream');
const fs = require('fs');
const db = require('../../app/database');

const fileStream = fs.createReadStream(
  '/mnt/42BA76D5BA76C4C7/Documents/APOTHEOSE/DATA/fr-en-annuaire-education.json',
  { encoding: 'utf-8' }
);
const jsonStream = StreamArray.withParser();

const processingStream = new Writable({
  write({ value }, encoding, callback) {
    setTimeout(async () => {
      try {
        // console.log(record.fields);
        if (value.fields.position && value.fields.code_commune) {
          const coordinates = value.fields.position.map((coord) =>
            parseFloat(coord)
          );
          await db.query(
            `INSERT INTO private.school (
                             commune_code,
                             name,
                             coordinates,
                             status,
                             address,
                             zip_code,
                             type
                                   ) SELECT data.* FROM ( SELECT $1, $2, ($3::point), $4, $5, $6, $7) AS data WHERE (
                                    SELECT COUNT(*) > 0 FROM private.commune WHERE code_insee=$1
                                );`,
            [
              value.fields.code_commune,
              value.fields.nom_etablissement,
              `(${coordinates})`,
              value.fields.statut_public_prive,
              value.fields.adresse_1,
              value.fields.code_postal,
              value.fields.type_etablissement,
            ]
          );
        }
        callback();
      } catch (error) {
        console.log(error);
      }
    }, 0.0000000001);
  },
  // Don't skip this, as we need to operate with objects, not buffers
  objectMode: true,
});

// Pipe the streams as follows
fileStream.pipe(jsonStream.input);
jsonStream.pipe(processingStream);

// So we're waiting for the 'finish' event when everything is done.
processingStream.on('finish', () => console.log('All done'));
