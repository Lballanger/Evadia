require('dotenv').config();
const StreamArray = require('stream-json/streamers/StreamArray');
const { Writable } = require('stream');
const fs = require('fs');
const db = require('../../app/database');

const fileStream = fs.createReadStream(
  '../api/JSON-2021-deploiement-haut-debit.json',
  {
    encoding: 'utf-8',
  }
);
const jsonStream = StreamArray.withParser();

const goodNumber = (value) => {
  let myString = `${value}`;
  while (myString.length < 5) {
    myString = `0${myString}`;
  }
  return myString;
};

// console.log(goodNumber('1234'));

const processingStream = new Writable({
  write({ value }, encoding, callback) {
    setTimeout(async () => {
      try {
        // console.log(value, 'commune_code = ', value.code_commune, '\n', 'coverage = ', value.pourcentage_internet, '\n');
        if (value) {
          // const coordinates = record.fields.position.map((coord) =>
          // parseFloat(coord)
          // );
          const commune = goodNumber(value.code_commune);
          // console.log("commune = ", `\'${commune}\'`);
          const { rows } = await db.query(
            `SELECT code_insee FROM private.commune WHERE code_insee='${commune}';`
          );
          if (rows.length > 0) {
            console.log(rows);
            await db.query(
              `INSERT INTO private.internet (
              commune_code, 
              coverage
              ) VALUES ($1, $2);`,
              [commune, value.pourcentage_internet]
            );
          }
          callback();
        }
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

// all done !!!
