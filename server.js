/********************************************************************************* * WEB322 – Assignment 02
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part * of this assignment has been copied manually or electronically from any other source
 * (including 3rd party web sites) or distributed to other students.
 *
 * Name: Rahul Bajaj Student ID: 107707218 Date: Sept 30, 2022
 *
 * Cyclic Web App URL: https://odd-cyan-bonobo-cape.cyclic.app/about
 *
 * GitHub Repository URL: https://github.com/rahulbajaj0242/web322-app ********************************************************************************/

var express = require('express');
var blogService = require('./blog-service');
var path = require('path');
var app = express();

var HTTP_PORT = process.env.PORT || 8080;

function onHttpStart() {
  console.log('Express http server listening on: ' + HTTP_PORT);
}

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.redirect('/about');
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/about.html'));
});

app.get('/blog', (req, res) => {
  blogService
    .getPublishedPosts()
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      res.send("there's been an error!");
    });
});

app.get('/posts', (req, res) => {
  blogService
    .getAllPosts()
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      res.send("there's been an error!");
    });
});

app.get('/categories', (req, res) => {
  blogService
    .getCategories()
    .then((categories) => {
      res.json(categories);
    })
    .catch((err) => {
      res.send("there's been an error!");
    });
});

blogService
  .initialize()
  .then(() => {
    app.listen(HTTP_PORT, onHttpStart);
  })
  .catch((err) => {
    console.log(err);
  });
