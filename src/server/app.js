const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const path = require('path');
app.use(express.static(path.join(__dirname, '../../public', 'index.html')));

const api = require('./routes/api');
app.use('/api', api);

const server = app.listen(8080);
console.log("Node listening on 8080.");

process.on('SIGINT', () => {
  server.close();
  process.exit();
});
