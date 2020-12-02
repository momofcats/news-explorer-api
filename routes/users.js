const userRouter = require('express').Router();
const {
  getUserInfo,
} = require('../controllers/usersController');

userRouter.get('/:id', getUserInfo);

module.exports = userRouter;
