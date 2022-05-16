const http = require('http');
const app = require('./app');
const { loadPlanetsData } = require('./models/planets.model');

const PORT = process.env.PORT || 4000;
const ENVIROMENT = process.env.ENVIROMENT || 'dev';

const server = http.createServer(app);

/**
 * It will load data from csv and start the server.
 */
async function startServer() {
  await loadPlanetsData();

  server.listen(PORT, () => {
    if (ENVIROMENT === 'dev') {
      console.log(`Listening on port ${PORT}`);
    }
  });
}

startServer();
