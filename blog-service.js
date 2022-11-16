const Sequelize = require('sequelize');
var sequelize = new Sequelize(
  'jgvlphxl',
  'jgvlphxl',
  'PRY8u9Wy0cUfsOSQ1R2C43Iw1BG7kXO5',
  {
    host: 'peanut.db.elephantsql.com',
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
      ssl: { rejectUnauthorized: false },
    },
    query: { raw: true },
  }
);

var Post = sequelize.define('Post', {
  body: Sequelize.TEXT,
  title: Sequelize.STRING,
  postDate: Sequelize.DATE,
  featureImage: Sequelize.STRING,
  published: Sequelize.BOOLEAN,
});

var Category = sequelize.define('Category', {
  category: Sequelize.STRING,
});

Post.belongsTo(Category, { foreignKey: 'category' });

module.exports.initialize = () => {
  return new Promise((resolve, reject) => {
    reject();
  });
};

module.exports.getAllPosts = () => {
  return new Promise((resolve, reject) => {
    reject();
  });
};

module.exports.getPublishedPosts = () => {
  return new Promise((resolve, reject) => {
    reject();
  });
};

module.exports.getPostById = (id) => {
  return new Promise((resolve, reject) => {
    reject();
  });
};

module.exports.getPostByMinDate = (date) => {
  return new Promise((resolve, reject) => {
    reject();
  });
};

module.exports.getCategories = () => {
  return new Promise((resolve, reject) => {
    reject();
  });
};

module.exports.getPostsByCategory = (id) => {
  return new Promise((resolve, reject) => {
    reject();
  });
};

module.exports.addPost = (postData) => {
  return new Promise((resolve, reject) => {
    reject();
  });
};

module.exports.getPublishedPostsByCategory = (category) => {
  return new Promise((resolve, reject) => {
    reject();
  });
};
