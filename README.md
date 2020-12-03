# news-explorer-api

## The API of "News explorer" is handled by the back-end server. It is build using node js express library.

* [A link to the repository which contains api code](https://github.com/momofcats/news-explorer-api)
* The API is located on a domain name: ykhilko.news-explorer.students.nomoreparties.site/api

### The API handles the following routes:

* creates a user with the passed email, password, and name in the body
POST /signup

* checks the email and password passed in the body and returns a JWT
POST /signin 

* returns information about the logged-in user (email and name)
GET /users/me

* returns all articles saved by the user
GET /articles

* creates an article with the passed keyword, title, text, date, source, link, and image in the body
POST /articles

* deletes the stored article by _id
DELETE /articles/articleId




