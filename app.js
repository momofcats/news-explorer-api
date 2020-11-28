const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/newsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

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
