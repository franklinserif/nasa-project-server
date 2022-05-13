const express = require('express');
const getAllPlanets = require('./planets.controller');

const planetRouter = express.Router();

/**
 * Router for all planes endpoints
 */
planetRouter.get('/planets', getAllPlanets);

module.exports = planetRouter;
