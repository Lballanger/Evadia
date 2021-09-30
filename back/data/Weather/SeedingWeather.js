// eslint-disable-next-line import/no-extraneous-dependencies
const StreamArray = require('stream-json/streamers/StreamArray');
const { Writable } = require('stream');
const fs = require('fs');
const db = require('../../app/database');

const fileStream = fs.createReadStream(
  '../api/meteo-donnees-synop-essentielles-omm.json',
  {
    encoding: 'utf-8',
  }
);
const jsonStream = StreamArray.withParser();

const processingStream = new Writable({
  write({ value }, encoding, callback) {
    setTimeout(async () => {
      try {
        if (value.fields.codegeo) {
          // console.log("commune_code = ", value.fields.codegeo, "\n" "coordinates = ", value.fields.coordonnees[0], "\n", "temperature = ", value.fields.tc, "\n", "humidity = ", value.fields.u, "\n", "wind = ", value.fields.ff, "\n", "date = ", value.fields.date, "\n");
          // const coordinates = record.fields.position.map((coord) =>
          //  parseFloat(coord)
          // );
          const { rows } = await db.query(
            `SELECT code_insee FROM private.commune WHERE code_insee='${value.fields.codegeo}';`
          );
          if (rows.length > 0) {
            console.log(rows);
            await db.query(
              `INSERT INTO private.weather (commune_code,
                                    coordinates,
                                    temperature,
                                    humidity,
                                    wind,
                                    date) 
                VALUES ($1, $2, $3, $4, $5, $6);`,
              [
                value.fields.codegeo,
                `(${value.fields.coordonnees[0]}, ${value.fields.coordonnees[1]})`,
                value.fields.tc,
                value.fields.u,
                value.fields.ff,
                value.fields.date,
              ]
            );
          }
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
