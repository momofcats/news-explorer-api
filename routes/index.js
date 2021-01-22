const mainRouter = require('express').Router();
const { celebrate, Joi, errors } = require('celebrate');
const userRouter = require('./users');
const articleRouter = require('./articles');
const { loginUser, registerNewUser } = require('../controllers/usersController');
const auth = require('../middleware/auth');

mainRouter.post('/signup', cors(), celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().alphanum().required(),
    name: Joi.string().min(2).max(30)
      .alphanum(),
  }),
}), registerNewUser);

mainRouter.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), loginUser);

mainRouter.use('/users', auth, userRouter);
mainRouter.use('/articles', auth, articleRouter);
mainRouter.use(errors());
module.exports = mainRouter;
