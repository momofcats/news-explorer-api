const Article = require('../models/article');
const {
  STATUS_CODE_OK,
  STATUS_CODE_CREATED,
} = require('../utils/statusCodes');

const errorMessages = require('../utils/errorMessages');

const NotFoundError = require('../errors/not-found-err');
const UnauthorizedError = require('../errors/unauthorized-err');

const getArticles = (req, res, next) => {
  Article.find({}).select('+owner')
    .then((articles) => {
      if (!articles) {
        throw new NotFoundError(errorMessages.notFoundArticles);
      }
      return res.status(STATUS_CODE_OK).send(articles);
    })
    .catch(next);
};

const createArticle = (req, res, next) => {
  const {
    keyword, title, description, publishedAt, source, url, urlToImage,
  } = req.body;
  Article.create({
    keyword, title, description, publishedAt, source, url, urlToImage, owner: req.user._id,
  })
    .then((article) => {
      res.status(STATUS_CODE_CREATED).send(article);
    })
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId).select('+owner')
    .then((article) => {
      if (!article) {
        throw new NotFoundError(errorMessages.noMatchingArticle);
      }
      if (req.user._id === article.owner.toString()) {
        Article.deleteOne(article)
          .then(() => res.status(STATUS_CODE_OK).send(article));
      } else {
        throw new UnauthorizedError(errorMessages.denied);
      }
    }).catch(next);
};
module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
