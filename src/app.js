const express = require('express');
const planetRouter = require('./routes/planets/planets.router');

const app = express();

/**
 * parse any incoming json request in req.body
 */
app.use(express.json());
app.use(planetRouter);

module.exports = app;
