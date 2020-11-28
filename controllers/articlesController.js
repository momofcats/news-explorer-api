const Article = require('../models/article');

const getArticles = (req, res) => {
  Article.find({})
    .then((articles) => {
      if (articles.length === 0) {
        return res.status(404).send({ message: 'Articles were not found' });
      }
      return res.status(200).send(articles);
    })
    .catch();
};

const createArticle = (req, res) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((article) => {
      res.status(201).send(article);
    })
    .catch();
};

const deleteArticle = (req, res) => {
  Article.findByIdAndRemove(req.params.articleId)
    .then((article) => {
      if (!article) {
        return res.status(400).send({ message: 'Article Id is not found' });
      }
      return res.status(200).send(article);
    }).catch();
};
module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
