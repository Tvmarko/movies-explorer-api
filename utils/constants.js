const BADREQUEST_ERROR = 400;
const NOTFOUND_ERROR = 404;
const AUTH_ERROR = 401;
const CONFLICT_ERROR = 409;
const VORBIDDEN_ERROR = 403;
const SERVER_ERROR = 500;

const MONGO_URL = process.env.NODE_ENV === 'production' ? process.env.MONGO_URL : 'mongodb://127.0.0.1:27017/moviesdb';

module.exports = {
  BADREQUEST_ERROR,
  NOTFOUND_ERROR,
  AUTH_ERROR,
  CONFLICT_ERROR,
  VORBIDDEN_ERROR,
  SERVER_ERROR,
  MONGO_URL,
};
