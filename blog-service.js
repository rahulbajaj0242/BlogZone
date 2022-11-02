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

module.exports.getPostById = (id) => {
  let post;
  return new Promise((resolve, reject) => {
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].id == id) {
        post = posts[i];
      }
    }

    if (post) {
      resolve(post);
    } else {
      reject('Album not found!');
    }
  });
};

module.exports.getPostByMinDate = (date) => {
  let tempPosts = [];
  return new Promise((resolve, reject) => {
    for (let i = 0; i < posts.length; i++) {
      if (new Date(posts[i].postDate) >= new Date(date)) {
        tempPosts.push(posts[i]);
      }
    }

    if (tempPosts.length != 0) {
      resolve(tempPosts);
    } else {
      reject('no results returned');
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

module.exports.getPostsByCategory = (id) => {
  let tempPosts = [];
  return new Promise((resolve, reject) => {
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].category == id) {
        tempPosts.push(posts[i]);
      }
    }

    if (tempPosts.length != 0) {
      resolve(tempPosts);
    } else {
      reject('No records found!');
    }
  });
};

module.exports.addPost = (postData) => {
  return new Promise((resolve, reject) => {
    if (postData) {
      postData.published =
        typeof postData.published == 'undefined' ? false : true;

      postData.id = posts.length + 1;
      posts.push(postData);
      resolve(postData);
    } else {
      reject('Empty Object');
    }
  });
};

module.exports.getPublishedPostsByCategory = (category) => {
  let publishedPosts = [];
  return new Promise((resolve, reject) => {
    posts.forEach((post) => {
      if (post.published == true && post.category == category)
        publishedPosts.push(post);
    });

    if (publishedPosts.length > 0) {
      resolve(publishedPosts);
    } else {
      reject('No results returned');
    }
  });
};
