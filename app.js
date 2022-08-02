const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
require('dotenv').config();
const router = require('./routes/index');
const errorsHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const { BASE_URL = 'mongodb://127.0.0.1:27017/moviesdb' } = process.env;
const { PORT = 3000, NODE_ENV, PRODUCT_URL } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(NODE_ENV === 'production' ? PRODUCT_URL : BASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(cors);

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => PORT);
