/* eslint-disable eqeqeq */
// eslint-disable-next-line import/no-extraneous-dependencies
const StreamArray = require('stream-json/streamers/StreamArray');
const { Writable } = require('stream');
const fs = require('fs');
const db = require('../../app/database');

const fileStream = fs.createReadStream(
  '/mnt/42BA76D5BA76C4C7/Téléchargements/shop_craft_office_csv/datajson.json',
  { encoding: 'utf-8' }
);
const jsonStream = StreamArray.withParser();

const processingStream = new Writable({
  write({ value }, encoding, callback) {
    setTimeout(async () => {
      try {
        if (
          value.type == 'artisans' ||
          value.type == 'bar' ||
          value.type == 'fast_food' ||
          value.type == 'beauty' ||
          value.type == 'restaurant' ||
          value.type == 'clothes' ||
          value.type == 'books' ||
          value.type == 'bank' ||
          value.type == 'optician' ||
          value.type == 'car_parts' ||
          value.type == 'bakery' ||
          value.type == 'pharmacy' ||
          value.type == 'supermarket' ||
          value.type == 'bag' ||
          value.type == 'automate_maker' ||
          value.type == 'automated_gate' ||
          value.type == 'automation' ||
          value.type == 'bakery' ||
          value.type == 'beauty' ||
          value.type == 'bookmaker' ||
          value.type == 'books' ||
          value.type == 'boutique' ||
          value.type == 'car' ||
          value.type == 'chocolate' ||
          value.type == 'cinema' ||
          value.type == 'clothes' ||
          value.type == 'coffee' ||
          value.type == 'fast_food' ||
          value.type == 'massage' ||
          value.type == 'optician' ||
          value.type == 'perfumery' ||
          value.type == 'seafood' ||
          value.type == 'shoes' ||
          value.type == 'ski' ||
          value.type == 'supermarket' ||
          value.type == 'tea' ||
          value.type == 'tobacco'
        ) {
          if (value.X && value.Y && value.com_insee) {
            const Y = parseFloat(value.Y);
            const X = parseFloat(value.X);
            // console.log(value);
            const { rows } = await db.query(
              `SELECT code_insee FROM private.commune WHERE code_insee='${value.com_insee}';`
            );
            if (rows.length > 0) {
              await db.query(
                `INSERT INTO private.commerce (
                                    name,
                                    coordinates,
                                    commune_code,
                                    type
                                    ) VALUES ($1, $2, $3, $4);`,
                [value.name, `(${Y},${X})`, value.com_insee, value.type]
              );
            }
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
