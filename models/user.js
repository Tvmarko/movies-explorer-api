const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isEmail } = require('validator');
const AuthError = require('../errors/auth-error');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'поле не может быть пустым'],
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: [true, 'поле не может быть пустым'],
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Некорректный формат e-mail',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthError('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthError('Неправильные почта или пароль'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
