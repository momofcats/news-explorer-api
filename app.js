const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const limiter = require('./utils/rateLimit');
require('dotenv').config();
const mainRouter = require('./routes/index');
const NotFoundError = require('./errors/not-found-err');
const notFoundResource = require('./utils/errorMessages');

const { requestLogger, errorLogger } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const jsonParser = bodyParser.json();

const { PORT = 3000, DATABASE_URL, NODE_ENV } = process.env;

const app = express();

mongoose.connect(NODE_ENV === 'production' ? DATABASE_URL : 'mongodb://localhost:27017/newsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(limiter);
app.use(helmet());
app.use(jsonParser);
app.use(requestLogger);
app.use('/', mainRouter);
app.use(errorLogger);
app.use((req, res) => {
  throw new NotFoundError(notFoundResource);
});
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
