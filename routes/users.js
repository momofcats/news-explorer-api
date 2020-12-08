const userRouter = require('express').Router();
const {
  getUserInfo,
} = require('../controllers/usersController');

userRouter.get('/me', getUserInfo);

module.exports = userRouter;
