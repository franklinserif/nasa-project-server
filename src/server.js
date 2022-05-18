const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');
const { loadPlanetsData } = require('./models/planets.model');

const { PORT } = process.env;
const ENVIROMENT = process.env.ENVIROMENT || 'dev';
const MONGO_URL = 'mongodb+srv://franklinserif:omYcf0PzCWE39tbk@nasacluster.xmw4a.mongodb.net/nasa?retryWrites=true&w=majority';

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (error) => {
  console.error(error);
});

const server = http.createServer(app);

/**
 * It will load data from csv and start the server
 */
async function startServer() {
  await mongoose.connect(MONGO_URL);

  await loadPlanetsData();

  server.listen(PORT, () => {
    if (ENVIROMENT === 'dev') {
      console.log(`Listening on port ${PORT}`);
    }
  });
}

startServer();
