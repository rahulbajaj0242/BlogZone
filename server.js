/********************************************************************************* * WEB322 – Assignment 02
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part * of this assignment has been copied manually or electronically from any other source
 * (including 3rd party web sites) or distributed to other students.
 *
 * Name: Rahul Bajaj Student ID: 107707218 Date: Oct 11, 2022
 *
 * Cyclic Web App URL: https://odd-cyan-bonobo-cape.cyclic.app/about
 *
 * GitHub Repository URL: https://github.com/rahulbajaj0242/web322-app ********************************************************************************/

var express = require('express');
var blogService = require('./blog-service');
var path = require('path');
var app = express();

const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

const exphbs = require('express-handlebars');
app.engine('.hbs', exphbs.engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');

var HTTP_PORT = process.env.PORT || 8080;

cloudinary.config({
  cloud_name: 'dqtojvooi',
  api_key: '534642193571396',
  api_secret: 'l6E2pN_QzNSOkPnljAk6fUPrX8w',
  secure: true,
});

const upload = multer();

app.use(function (req, res, next) {
  let route = req.path.substring(1);
  app.locals.activeRoute =
    route == '/' ? '/' : '/' + route.replace(/\/(.*)/, '');
  app.locals.viewingCategory = req.query.category;
  next();
});

function onHttpStart() {
  console.log('Express http server listening on: ' + HTTP_PORT);
}

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.redirect('/about');
});

app.get('/about', (req, res) => {
  res.render('about', {
    layout: 'main',
  });
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

app.get('/posts/add', (req, res) => {
  // res.sendFile(path.join(__dirname, '/views/addPost.html'));
  res.render('addPost', {
    layout: 'main',
  });
});

app.get('/posts', (req, res) => {
  if (req.query.category) {
    blogService
      .getPostsByCategory(req.query.category)
      .then((category) => {
        res.json(category);
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (req.query.minDate) {
    blogService
      .getPostByMinDate(req.query.minDate)
      .then((posts) => {
        res.json(posts);
      })
      .catch((err) => {
        console.log(err);
      });

    //if no query has been passes
  } else if (JSON.stringify(req.query) === JSON.stringify({})) {
    blogService
      .getAllPosts()
      .then((posts) => {
        res.json(posts);
      })
      .catch((err) => {
        res.send("there's been an error!");
      });

    //if wrong query name has been passed
  } else {
    res.status(404).send('Page Not Found');
  }
});

app.get('/post/:value', (req, res) => {
  blogService
    .getPostById(req.params.value)
    .then((post) => {
      res.json(post);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post('/posts/add', upload.single('featureImage'), (req, res) => {
  if (req.file) {
    let streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    async function upload(req) {
      let result = await streamUpload(req);
      console.log(result);
      return result;
    }

    upload(req).then((uploaded) => {
      processPost(uploaded.url);
    });
  } else {
    processPost('');
  }

  function processPost(imageUrl) {
    req.body.featureImage = imageUrl;

    // TODO: Process the req.body and add it as a new Blog Post before redirecting to /posts
    blogService
      .addPost(req.body)
      .then((post) => {
        res.redirect('/posts');
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

blogService
  .initialize()
  .then(() => {
    app.listen(HTTP_PORT, onHttpStart);
  })
  .catch((err) => {
    console.log(err);
  });
