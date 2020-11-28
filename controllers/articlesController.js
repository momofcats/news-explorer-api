const Article = require('../models/article');
const {
  STATUS_CODE_OK,
  STATUS_CODE_CREATED,
} = require('../utils/statusCodes');

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-req-err');

const getArticles = (req, res, next) => {
  Article.find({})
    .then((articles) => {
      if (articles.length === 0) {
        throw new NotFoundError('Articles were not found');
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
  Article.findByIdAndRemove(req.params.articleId)
    .then((article) => {
      if (!article) {
        throw new BadRequestError('Article Id is not found');
      }
      return res.status(STATUS_CODE_OK).send(article);
    }).catch(next);
};
module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
