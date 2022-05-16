/* eslint-disable operator-linebreak */
const {
  getAllLaunches,
  addNewLaunches,
  existLauncheWitId,
  abortLaunchById,
} = require('../../models/launches.model');

/**
 * It controls all incoming request and
 * response for all launches endpoint
 * @param {Object} req
 * @param {Object} res
 */
function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
  const launch = req.body;

  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({ error: 'Missing required launch property' });
  }

  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({ error: 'Invalid launch Date' });
  }
  addNewLaunches(launch);
  return res.status(201).json(launch);
}

/**
 * It will control the request for aborted the launch
 * @param {Object} req
 * @param {Object} res
 */
function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);
  if (!existLauncheWitId(launchId)) {
    return res.status(400).json({ error: 'Launch not found' });
  }
  const aborted = abortLaunchById(launchId);
  return res.status(200).json(aborted);
}

module.exports = { httpGetAllLaunches, httpAddNewLaunch, httpAbortLaunch };
