const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const BadRequestError = require('../errors/badrequest-error');

const validateURL = (value) => {
  if (validator.isURL(value)) {
    return value;
  }
  throw new BadRequestError('Переданы некорректные данные');
};

router.get('/', getMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(30),
    director: Joi.string().required().min(2).max(30),
    duration: Joi.number().required(),
    year: Joi.string().required().min(2).max(30),
    description: Joi.string().required().min(2).max(30),
    image: Joi.string().required().custom(validateURL),
    trailerLink: Joi.string().required().custom(validateURL),
    nameRU: Joi.string().required().min(2).max(30),
    nameEN: Joi.string().required().min(2).max(30),
    thumbnail: Joi.string().required().custom(validateURL),
    movieId: Joi.number().required(),
  }),
}), createMovie);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.number().required(),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
}), deleteMovie);

module.exports = router;
