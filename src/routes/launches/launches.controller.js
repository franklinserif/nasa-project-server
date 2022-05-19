/* eslint-disable operator-linebreak */
const {
  getAllLaunches,
  scheduleNewLaunch,
  existLauncheWitId,
  abortLaunchById,
} = require('../../models/launches.model');

/**
 * It controls all incoming request and
 * response for all launches endpoint
 * @param {Object} req
 * @param {Object} res
 */
async function httpGetAllLaunches(req, res) {
  const listOfLaunches = await getAllLaunches();
  return res.status(200).json(listOfLaunches);
}

async function httpAddNewLaunch(req, res) {
  const launch = req.body;

  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res
      .status(400)
      .json({ error: 'Missing required launch property' });
  }

  launch.launchDate = new Date(launch.launchDate);
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(launch.launchDate)) {
    return res
      .status(400)
      .json({ error: 'Invalid launch Date' });
  }
  const newLaunch = await scheduleNewLaunch(launch);
  return res.status(201).json(newLaunch);
}

/**
 * It will control the request for aborted the launch
 * @param {Object} req
 * @param {Object} res
 */
async function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);
  const exitLaunch = await existLauncheWitId(launchId);
  console.log('exitLaunch', exitLaunch);
  if (!exitLaunch) {
    return res
      .status(400)
      .json({ error: 'Launch not found' });
  }
  const aborted = await abortLaunchById(launchId);
  console.log('aborted', aborted);
  if (!aborted) {
    return res.status(400).json({
      error: 'Launch not aborted',
    });
  }

  return res.status(200).json({ ok: true });
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
