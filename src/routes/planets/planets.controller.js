const allPlanets = require('../../models/planets.model');

/**
 * handle the incoming request for get
 * all planets
 * @param {Object} req
 * @param {Object} res
 */
function getAllPlanets(req, res) {
  /**
   *  by default express return 200 ok
   *  return in orden to end the execution
   *  of the function
   */
  return res.status(200).json(allPlanets);
}

module.exports = getAllPlanets;
