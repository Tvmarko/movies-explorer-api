const mongoose = require('mongoose');
const { URL_REGEX } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return URL_REGEX.test(url);
      },
      message: 'Не верный формат ссылки',
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return URL_REGEX.test(url);
      },
      message: 'Не верный формат ссылки',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return URL_REGEX.test(url);
      },
      message: 'Не верный формат ссылки',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
    unique: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
