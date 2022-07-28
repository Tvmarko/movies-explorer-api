const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { URL_REGEX } = require('../utils/constants');

router.get('/', getMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().min(2).max(30),
    director: Joi.string().min(2).max(30),
    duration: Joi.number(),
    year: Joi.string().min(2).max(30),
    description: Joi.string().min(2).max(30),
    image: Joi.string().required().regex(URL_REGEX),
    trailer: Joi.string().required().regex(URL_REGEX),
    nameRU: Joi.string().min(2).max(30),
    nameEN: Joi.string().min(2).max(30),
    thumbnail: Joi.string().required().regex(URL_REGEX),
    movieId: Joi.string(),
  }),
}), createMovie);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex(),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
}), deleteMovie);

module.exports = router;
