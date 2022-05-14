const { getAlllaunches } = require('../../models/launches.model');

/**
 * It controls all incoming request and
 * response for all launches endpoint
 * @param {Object} req
 * @param {Object} res
 */
function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAlllaunches());
}

module.exports = httpGetAllLaunches;
