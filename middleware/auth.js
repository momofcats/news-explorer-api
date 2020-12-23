const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const UnauthorizedError = require('../errors/unauthorized-err');
const errorMessages = require('../utils/errorMessages');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer')) {
    throw new UnauthorizedError(errorMessages.unAuthorized);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret');
  } catch (err) {
    throw new UnauthorizedError(errorMessages.unAuthorized);
  }
  req.user = payload;
  next();
};
