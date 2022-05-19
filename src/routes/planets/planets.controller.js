const { getAllPlanets } = require('../../models/planets.model');

/**
 * handle the incoming request for get
 * all planets
 * @param {Object} req
 * @param {Object} res
 */
async function httpGetAllPlanets(req, res) {
  /**
   *  by default express return 200 ok
   *  return in orden to end the execution
   *  of the function
   */

  const listOfPlanets = await getAllPlanets();
  return res.status(200).json(listOfPlanets);
}

module.exports = httpGetAllPlanets;
