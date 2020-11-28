const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config();

const userRouter = require('./routes/users');
const articleRouter = require('./routes/articles');
const { requestLogger, errorLogger } = require('./middleware/logger');

const jsonParser = bodyParser.json();

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/newsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
app.use(jsonParser);
app.use(requestLogger);
app.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133',
  };

  next();
});

app.use('/users', userRouter);
app.use('/articles', articleRouter);

app.use(errorLogger);
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'an error occured on the server'
      : message,
  });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
