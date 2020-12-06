const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUserInfo,
} = require('../controllers/usersController');

userRouter.get('/:id', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().alphanum().length(24),
  }),
}), getUserInfo);

module.exports = userRouter;
