const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const {
  STATUS_CODE_OK,
  STATUS_CODE_CREATED,
} = require('../utils/statusCodes');

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-req-err');
const ForbiddenError = require('../errors/forbidden-err');

const SALT = 10;
const { NODE_ENV, JWT_SECRET } = process.env;

const getUserInfo = (req, res, next) => {
  let userId = req.params.id;
  if (userId === 'me') {
    userId = req.user._id;
  }
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('No user with matching ID found');
      }
      return res.status(STATUS_CODE_OK).send(user);
    })
    .catch(next);
};

const registerNewUser = (req, res, next) => {
  const { email, password, name } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Email or password should not be empty');
  }
  return User.findOne({ email })
    .then((admin) => {
      if (admin) {
        throw new ForbiddenError('User with this email already exists');
      }
      return bcrypt.hash(password, SALT)
        .then((hash) => User.create({
          name, email, password: hash,
        }))
        .then((user) => res.status(STATUS_CODE_CREATED).send(user));
    })
    .catch(next);
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Email or password should not be empty');
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret', { expiresIn: '7d' });
      res.status(STATUS_CODE_CREATED)
        .send({ token });
    })
    .catch(next);
};

module.exports = {
  getUserInfo,
  registerNewUser,
  loginUser,
};
