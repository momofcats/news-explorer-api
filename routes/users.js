const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUserInfo,
} = require('../controllers/usersController');

userRouter.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().regex(/me/),
  }),
}), getUserInfo);

module.exports = userRouter;
