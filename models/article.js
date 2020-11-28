const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const articleShema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    validate: {
      validator: (v) => isURL(v),
      message: 'Invalid Url',
    },
  },
  image: {
    type: String,
    validate: {
      validator: (v) => isURL(v),
      message: 'Invalid Url',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'author',
    required: true,
    select: false,
  },
}, { versionKey: false });

module.exports = mongoose.model('article', articleShema);
