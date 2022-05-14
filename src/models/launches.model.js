const launches = new Map();

const launch = {
  flightNumber: 100,
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 27, 2030'),
  destination: 'Kepler-442 b',
  customer: ['ZTM', 'NASA'],
  upcomming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

/**
 * It will return all launches data
 * convert it in array
 * @returns {Array<Object>} launches
 */
function getAllLaunches() {
  return Array.from(launches.values());
}

module.exports = {
  getAllLaunches,
};
