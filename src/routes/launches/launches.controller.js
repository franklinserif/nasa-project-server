const { launches } = require('../../models/launches.model');

/**
 * It controls all incoming request and
 * response for all launches endpoint
 * @param {Object} req
 * @param {Object} res
 */
function getAllLaunches(req, res) {
  return res.status(200).json(Array.from(launches.values()));
}

module.exports = getAllLaunches;
