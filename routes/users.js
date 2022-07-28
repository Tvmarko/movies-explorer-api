const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUser, updateUser } = require('../controllers/users');

router.get('/me', getUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().required().min(2).max(30),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
}), updateUser);

module.exports = router;
