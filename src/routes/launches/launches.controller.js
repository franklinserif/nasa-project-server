/* eslint-disable operator-linebreak */
const {
  getAlllaunches,
  addNewLaunches,
} = require('../../models/launches.model');

/**
 * It controls all incoming request and
 * response for all launches endpoint
 * @param {Object} req
 * @param {Object} res
 */
function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAlllaunches());
}

function httpAddNewLaunch(req, res) {
  const launch = req.body;

  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.destination
  ) {
    return res.status(400).json({ error: 'Missing required launch property' });
  }

  if (isNaN(launch.launchDate)) {
    return res.status(400).json({ error: 'Invalid launch Date' });
  }
  launch.launchDate = new Date(launch.launchDate);
  addNewLaunches(launch);
  res.status(201).json(launch);
}
module.exports = { httpGetAllLaunches, httpAddNewLaunch };
