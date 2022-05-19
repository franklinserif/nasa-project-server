const launchesDatabase = require('./launches.mongo');
const planets = require('./planet.mongo');

const launches = new Map();

const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
  flightNumber: 100,
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 27, 2030'),
  target: 'Kepler-442 b',
  customers: ['ZTM', 'NASA'],
  upcoming: true,
  success: true,
};

saveLaunches(launch);

/**
 * It will return the latest flightNumber created
 * If there is no launches found then will return by default
 * 99
 * @returns {Number}
 */
async function getLatestFlightNumber() {
  const latestLaunch = await launchesDatabase.findOne().sort('-flightNumber');
  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }
  return latestLaunch.flightNumber + 1;
}

/**
 *  It saves a new launch in MongoDb
 * @param {Object} newLaunch
 */
async function saveLaunches(newLaunch) {
  // Get the current planet if exit
  const planet = await planets.findOne({
    keplerName: newLaunch.target,
  });
  /**
   * Verify if target (planet) exist in MongoDB
   * if not exist throw an error
   *  */
  if (!planet) {
    throw new Error('No matching planet was found');
  }

  await launchesDatabase.updateOne(
    {
      flightNumber: launch.flightNumber,
    },
    newLaunch,
    { upsert: true },
  );
}

launches.set(launch.flightNumber, launch);
saveLaunches(launch);

/**
 * It will return all launches data
 * convert it in array
 * @returns {Array<Object>} launches
 */
async function getAllLaunches() {
  try {
    const listOfLaunches = await launchesDatabase.find({}, { _id: 0, __v: 0 });

    return listOfLaunches;
  } catch (error) {
    console.log(`Could not find launches ${error}`);
    return [{}];
  }
}

async function scheduleNewLaunch(currentlaunch) {
  const newFlightNumber = await getLatestFlightNumber();
  const newLaunch = {
    ...currentlaunch,
    flightNumber: newFlightNumber,
    success: true,
    upcoming: true,
    customers: ['Zero To Mastery', 'NASA'],
  };
  try {
    await saveLaunches(newLaunch);
    return newLaunch;
  } catch (error) {
    throw new Error('cannot create a new Launch');
  }
}

/**
 * It will verify if launch exist
 * @param {number} launchId
 * @returns
 */
function existLauncheWitId(launchId) {
  return launches.has(launchId);
}

function abortLaunchById(launchId) {
  const aborted = launches.get(launchId);

  aborted.upcoming = false;
  aborted.success = false;

  return aborted;
}

module.exports = {
  getAllLaunches,
  scheduleNewLaunch,
  existLauncheWitId,
  abortLaunchById,
};
