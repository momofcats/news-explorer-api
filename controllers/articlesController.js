const Article = require('../models/article');
const {
  STATUS_CODE_OK,
  STATUS_CODE_CREATED,
} = require('../utils/statusCodes');

const {
  notFoundArticles,
  noMatchingArticle,
  denied,
} = require('../utils/errorMessages');

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-req-err');
const UnauthorizedError = require('../errors/unauthorized-err');

const getArticles = (req, res, next) => {
  Article.find({})
    .then((articles) => {
      if (articles.length === 0) {
        throw new NotFoundError(notFoundArticles);
      }
      return res.status(STATUS_CODE_OK).send(articles);
    })
    .catch(next);
};

const createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
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
        throw new BadRequestError(noMatchingArticle);
      }
      if (req.user._id === article.owner.toString()) {
        Article.deleteOne(article)
          .then(() => res.status(STATUS_CODE_OK).send(article));
      } else {
        throw new UnauthorizedError(denied);
      }
    }).catch(next);
};
module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
