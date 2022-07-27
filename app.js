const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
require('dotenv').config();
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/movies');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorsHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const NotFoundError = require('./errors/notfound-error');
const { URL_REGEX } = require('./utils/constants');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/moviesdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(cors);
app.use(requestLogger);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().regex(URL_REGEX),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().regex(URL_REGEX),
    password: Joi.string().required().min(8),
  }),
}), login);

app.use(auth);

app.use('/', userRoutes);
app.use('/', cardRoutes);

app.use((req, res, next) => next(new NotFoundError('Запрашиваемые данные не найдены')));

app.use(errorLogger);

app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => PORT);
