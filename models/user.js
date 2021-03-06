const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/unauthorized-err');
const errorMessages = require('../utils/errorMessages');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Wrong email format',
    },
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
}, { versionKey: false });

userSchema.methods.toJSON = function toJSON() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(errorMessages.incorrectCredentials);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError(errorMessages.incorrectCredentials));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
