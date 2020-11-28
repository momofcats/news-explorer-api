const userRouter = require('express').Router();
const {
  getUsers,
  getUserInfo,
} = require('../controllers/usersController');

userRouter.get('/', getUsers);
userRouter.get('/:id', getUserInfo);

module.exports = userRouter;
