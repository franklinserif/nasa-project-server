const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const planetRouter = require('./routes/planets/planets.router');

const app = express();
app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
);

/**
 * Logs
 */
app.use(
  morgan('combined', {
    skip: (req, res) => res.statusCode < 400,
  }),
);
/**
 * parse any incoming json request in req.body
 */
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(planetRouter);
app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public'));
});

module.exports = app;
