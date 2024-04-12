const express = require('express');
require('dotenv').config();
const app = express();

const path = require('path');

app.use(express.static('public'));

const portNumber = process.env.PORT || 3500;

const URL_API = process.env.GRAPHQL_URL;
const env = { URL_API };

app.get('/env.js', (req, res) => {
  res.send(`window.ENV = ${JSON.stringify(env)}`);
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve('public/index.html'));
});

app.listen(portNumber, function () {
    console.log('UI Server started on port ' + portNumber);
});