const express = require('express');
const app = module.exports = express();

const authentication = require('./authentication');
app.use('/auth', authentication);