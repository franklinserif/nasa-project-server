/* eslint-disable operator-linebreak */
const { parse } = require('csv-parse');
const fs = require('fs');
const path = require('path');

const habitablePlanets = [];

/**
 * It will verify if planet conditions are good for
 * human being
 * @param {Object} planet
 * @returns
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
 * IT will parse and read csv kepler data
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
      .on('data', (data) => {
        if (isHabitablePlanet(data)) {
          habitablePlanets.push(data);
        }
      })
      .on('error', (error) => {
        console.log(error);
        reject();
      })
      .on('end', () => {
        /*  console.log(habitablePlanets.map((planet) => planet.kepler_name));
        console.log(`${habitablePlanets.length} habitable planets founds`); */
        resolve();
      });
  });
}

function getAllPlanets() {
  return habitablePlanets;
}
module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
