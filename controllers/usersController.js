const User = require('../models/user');

const {
  STATUS_CODE_OK,
} = require('../utils/statusCodes');

const NotFoundError = require('../errors/not-found-err');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (users.length === 0) {
        throw new NotFoundError('Users were not found');
      }
      return res.status(STATUS_CODE_OK).send(users);
    })
    .catch(next);
};

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

module.exports = {
  getUsers,
  getUserInfo,
};
