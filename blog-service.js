const fs = require('fs');

let posts = [];
let categories = [];

module.exports.initialize = () => {
  return new Promise((resolve, reject) => {
    fs.readFile('./data/posts.json', 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        posts = JSON.parse(data);
        fs.readFile('./data/categories.json', 'utf8', (err, data) => {
          if (err) {
            reject(err);
          } else {
            console.log(data);
            categories = JSON.parse(data);
            resolve('Success!');
          }
        });
      }
    });
  });
};

module.exports.getAllPosts = () => {
  return new Promise((resolve, reject) => {
    if (posts.length > 0) {
      resolve(posts);
    } else {
      reject('No results returned');
    }
  });
};

module.exports.getPublishedPosts = () => {
  let publishedPosts = [];
  return new Promise((resolve, reject) => {
    posts.forEach((post) => {
      if (post.published) publishedPosts.push(post);
    });

    if (publishedPosts.length > 0) {
      resolve(publishedPosts);
    } else {
      reject('No results returned');
    }
  });
};

module.exports.getCategories = () => {
  return new Promise((resolve, reject) => {
    if (categories.length > 0) {
      resolve(categories);
    } else {
      reject('No results returned');
    }
  });
};
