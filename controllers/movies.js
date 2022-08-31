const Movie = require('../models/movie');
const BadRequestError = require('../errors/badrequest-error');
const NotFoundError = require('../errors/notfound-error');
const ForbiddenError = require('../errors/vorbidden-error');

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .populate('user')
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const ownerId = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: ownerId,
  })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные');
      }
      throw err;
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findOne({ movieId })
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Запрашиваемые данные не найдены');
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Нет прав на удаление');
      }
      return movie.remove()
        .then(() => {
          res.status(200).send({ message: 'Фильм удален' });
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Переданы некорректные данные');
      }
      throw err;
    })
    .catch(next);
};
