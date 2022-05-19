/* eslint-disable operator-linebreak */
const { parse } = require('csv-parse');
const fs = require('fs');
const path = require('path');
const planets = require('./planet.mongo');

/**
 * It will verify if planet conditions are good for
 * human being
 * @param {Object} planet
 * @returns {void}
 */
function isHabitablePlanet(planet) {
  return (
    planet?.koi_disposition === 'CONFIRMED' &&
    planet.koi_insol > 0.36 &&
    planet.koi_insol < 1.11 &&
    planet.koi_prad < 1.6
  );
}

/**
 * It upsert (save if already exist or insert if it's not exist)
 * a planet into Mongo db
 * @param {Object} planet
 * @return {void}
 */
async function savePlanet(planet) {
  await planets.updateOne(
    { keplerName: planet.kepler_name },
    { keplerName: planet.kepler_name },
    { upsert: true },
  );
}

/**
 * It will find all planets in mongo db and return a list
 * @returns {Object[]}
 */
async function getAllPlanets() {
  try {
    const planetsList = await planets.find({}, { _id: 0, __v: 0 });

    return planetsList;
  } catch (error) {
    console.log(`Could not save planet ${error}`);
    return [{}];
  }
}

/**
 * IT will parse and read csv kepler data and
 * update or insert the data into Mogodb
 * @returns {Promise}
 */
async function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'),
    )
      .pipe(
        parse({
          comment: '#',
          columns: true,
        }),
      )
      .on('data', async (data) => {
        if (isHabitablePlanet(data)) {
          /*
           * TODO: Replace below create with insert + udpate = upsert
           */
          await savePlanet(data);
        }
      })
      .on('error', (error) => {
        console.log(error);
        reject();
      })
      .on('end', async () => {
        const countsPlanetsFound = (await getAllPlanets()).length;
        console.log(`${countsPlanetsFound} habitable planets found`);
        resolve();
      });
  });
}

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
