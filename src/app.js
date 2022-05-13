const express = require('express');

const app = express();

/**
 * parse any incoming json request in req.body
 */
app.use(express.json());

module.exports = app;
