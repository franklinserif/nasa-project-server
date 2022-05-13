const http = require('http');
const app = require('./app');

const PORT = process.env.PORT || 8000;
const ENVIROMENT = process.env.ENVIROMENT || 'dev';

const server = http.createServer(app);

server.listen(PORT, () => {
  if (ENVIROMENT === 'dev') {
    console.log(`Listening on port ${PORT}`);
  }
});
