const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config();
const mainRouter = require('./routes/index');

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
app.use('/', mainRouter);
app.use(errorLogger);

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'An error occured on the server'
      : message,
  });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
