const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const articleSchema = new mongoose.Schema({
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
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator: (v) => isURL(v),
      message: 'Invalid Url',
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
}, { versionKey: false });

articleSchema.methods.toJSON = function toJSON() {
  const obj = this.toObject();
  delete obj.owner;
  return obj;
};

module.exports = mongoose.model('article', articleSchema);
