require('dotenv').config();
// eslint-disable-next-line import/no-extraneous-dependencies
const fetch = require('node-fetch');
const db = require('../../app/database');
// const dataJSON = require('/mnt/42BA76D5BA76C4C7/Téléchargements/fr-esr-referentiel-geographique.json')

const getCommune = async () => {
  const result = await fetch(
    'https://geo.api.gouv.fr/communes?fields=nom,code,codeDepartement,codesPostaux,codeRegion,centre,population'
  );
  return result.json();
};

// const findGeo = async (code) => {
//     return new Promise((resolve, reject) => {
//         const result = dataJSON.find( value => value.fields.com_code === code);
//             resolve(result.fields.geolocalisation);
//     })
// }

// const getMissData = (data) => {
//     const resultCodeInsee = data.map( value => value.code);
//     const dataCode =  dataJSON.map( value => value.fields.com_code);

//     const jesaispastropquoi = new Set([...resultCodeInsee,...dataCode]);

//     const result = Array.from(jesaispastropquoi).filter( value => !resultCodeInsee.includes(value) && !exclude.includes(value));

//     return result.map( code => dataJSON.find ( value => value.fields.com_code === code )).map( data => ({
//         code:data.fields.com_code,
//         codeDepartement:data.fields.dep_code,
//         codesPostaux:data.fields.*************
//         codeRegion:data.fields.reg_code,
//         nom:data.fields.
//         coordinates:data.fields,
//         population:data.fields
//     }))
// }

// Copyright : Germain

// const exclude = ['98411','98412','98413','98414','98415','97501','97502','97701','97801','98611','98612','98613','98711','98712','98713','98714','98715','98716','98717','98718','98719','98720','98721','98722','98723','98724','98725','98726','98727','98728','98729','98730','98731','98732','98733','98734','98735','98736','98737','98738','98739','98740','98741','98742','98743','98744','98745','98746','98747','98748','98749','98750','98751','98752','98753','98754','98755','98756','98757','98758','98801','98802','98803','98804','98805','98806','98807','98808','98809','98810','98811','98812','98813','98814','98815','98816','98817','98818','98819','98820','98821','98822','98823','98824','98825','98826','98827','98828','98829','98830','98831','98832','98833','98901'];

const insertBDD = async () => {
  try {
    const data = await getCommune();
    // console.log(await getMissData(data));
    for (const value of data) {
      // console.log(value);
      const coordinates = value.centre.coordinates.map((coord) =>
        parseFloat(coord)
      );
      // console.log(coordinates[0]);

      // if (!exclude.includes(value.code)) {
      //     let coordinates;

      //     if (!value.centre) {
      //         coordinates = await findGeo(value.code);
      //         console.log(value.code);
      //     } else {
      //         coordinates = value.centre.coordinates;
      //     }

      await db.query(
        `INSERT INTO private.commune (
                        code_insee,
                        code_departement,
                        code_postal,
                        code_region,
                        city_name,
                        coordinates,
                        population
                              ) VALUES ($1, $2, $3, $4, $5, $6, $7);`,
        [
          value.code,
          value.codeDepartement,
          value.codesPostaux,
          value.codeRegion,
          value.nom,
          `(${coordinates[1]},${coordinates[0]})`,
          value.population,
        ]
      );
    }
  } catch (error) {
    console.log(error);
  }
};

insertBDD();
