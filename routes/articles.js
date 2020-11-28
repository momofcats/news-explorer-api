const articleRouter = require('express').Router();
const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articlesController');

articleRouter.get('/', getArticles);
articleRouter.post('/', createArticle);
articleRouter.delete('/:articleId', deleteArticle);
module.exports = articleRouter;
