const mongoose = require('mongoose');

const launchesSchemas = new mongoose.Schema({
  flightNumber: {
    type: Number,
    required: true,
  },
  launcheDate: { type: Date, required: true },
  mission: { type: String, required: true },
  rocket: { type: String, required: true },
  tatget: {
    type: String,
    required: true,
  },
  customers: [String],
  upcoming: {
    type: Boolean,
    required: true,
  },
  success: {
    type: Boolean,
    required: true,
    default: true,
  },
});
