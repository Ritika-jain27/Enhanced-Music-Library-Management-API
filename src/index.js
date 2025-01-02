const express = require('express');
const restServiceRouter = require('./rest-service');
require('dotenv');

const CONFIG = require('./config');

const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 
const port = process.env.PORT||6000;
app.use('/', restServiceRouter);

app.listen(port, () => {
  console.log(`Listening at http://${CONFIG.host}:${port}`);
});
