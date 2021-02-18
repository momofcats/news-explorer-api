# news-explorer-api

This repository contains the api for [News Explorer App](https://github.com/momofcats/news-explorer-frontend).
The API server is buid with the Express.js and MongoDb and hosted on AWS.

Root-endpoint:

      api.ykhilko.news-explorer.students.nomoreparties.site

# Response Codes

    200: Success
    201: Created
    400: Bad request
    404: Not found
    403: Forbidden
    409: Conflict
    401: Unauthorized

# Paths, Sample Requests and Responses

All responses come in standard JSON. All requests must include a content-type of application/json header and the body must be valid JSON.

## Signup

Request:

    POST /signup
    Content-Type: application/json

    Body:
        {
          “email”: “foo@bar.com”,
          “password”: “12345”,
          "name": "John Doe"
        }

Successful Response:

    HTTP/1.1 201 CREATED
        {
          “email”: “foo@bar.com”,
          "name": "John Doe",
          “_id”: “902dae4c9a05e700048b9aak”

        }

## Login

Request:

     POST /signin
     Content-Type: application/json

     Body:
         {
            “email”: “foo@bar.com”,
            “password”: “12345”,
          }

Successful Response:

    HTTP/1.1 201 CREATED

        {"token":                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJfaWQiOiI2MDJkYWU0YzlhMDVlNzAwMDQ4YjlhYWYiLCJpYXQiOjE2MTM2MDc4NjYsImV4cCI6MTYxNDIxMjY2Nn0.anh7WUfmblTxP8cVR2lOkx-7qB95Et1Bvd10B7yhsLQ"}


## Return information about the logged-in user

Request:

    GET /users/me
    Authentication: Bearer “token”,
    Content-Type: application/json

Successful Response:

    HTTP/1.1 200 OK
        {
          "_id":"902dae4c9a05e700048b9aak",
          "email":"foo@barl.com",
          "name": "John Doe"
        }

## Return array of articles saved by the users in the database

Request:

    GET /articles
    Authentication: Bearer “token”,
    Content-Type: application/json

Successful Response:

    HTTP/1.1 200 OK
    [
      {
        "description": "some description",
        "keyword": "cute cats"
        "owner": "600c6565029ed46372eefe3a"
        "publishedAt": "2021-01-20T06:34:54Z"
        "source": "Lifehacker Australia"
        "title": "Ask LH: Can Cats Catch Colds?"
        "url": "https://www.example.com"
        "urlToImage": "https://image.example.jpg"
        "_id": "600c659c029ed46372eefe3c"
      }
    ]

## Create an article with the passed keyword, title, text, date, source, link, and image in the body

Request:

    POST /articles
    Authentication: Bearer “token”,
    Content-Type: application/json
    body:
    {
        "description": "some description",
        "keyword": "cute cats"
        "owner": "600c6565029ed46372eefe3a"
        "publishedAt": "2021-01-20T06:34:54Z"
        "source": "Lifehacker Australia"
        "title": "Ask LH: Can Cats Catch Colds?"
        "url": "https://www.example.com"
        "urlToImage": "https://image.example.jpg"
      }

Successful Response:

    HTTP/1.1 201 CREATED
      {
          "description": "some description",
          "keyword": "cute cats"
          "owner": "600c6565029ed46372eefe3a"
          "publishedAt": "2021-01-20T06:34:54Z"
          "source": "Lifehacker Australia"
          "title": "Ask LH: Can Cats Catch Colds?"
          "url": "https://www.example.com"
          "urlToImage": "https://image.example.jpg"
          "_id": "600c659c029ed46372eefe3c"
      }

## Delete article by id from the database

Request:

    DELETE /articles/:articleId
    Authentication: Bearer “token”,
    Content-Type: application/json

Successful Response:

    HTTP/1.1 200 OK
    {
          "description": "some description",
          "keyword": "cute cats"
          "owner": "600c6565029ed46372eefe3a"
          "publishedAt": "2021-01-20T06:34:54Z"
          "source": "Lifehacker Australia"
          "title": "Ask LH: Can Cats Catch Colds?"
          "url": "https://www.example.com"
          "urlToImage": "https://image.example.jpg"
          "_id": "600c659c029ed46372eefe3c"
      }
