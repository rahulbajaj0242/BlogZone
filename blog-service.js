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
  postID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  body: Sequelize.TEXT,
  title: Sequelize.STRING,
  postDate: Sequelize.DATE,
  featureImage: Sequelize.STRING,
  published: Sequelize.BOOLEAN,
});

var Category = sequelize.define('Category', {
  categoryID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  category: Sequelize.STRING,
});

Post.belongsTo(Category, { foreignKey: 'category' });

module.exports.initialize = () => {
  return new Promise((resolve, reject) => {
    sequelize
      .sync()
      .then(() => {
        resolve('DATABASE SYNC COMPLETE!');
      })
      .catch((err) => {
        reject('unable to sync the database');
      });
  });
};

module.exports.getAllPosts = () => {
  return new Promise((resolve, reject) => {
    Post.findAll()
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject('no results returned ' + err);
      });
  });
};

module.exports.getPublishedPosts = () => {
  return new Promise((resolve, reject) => {
    Post.findAll({
      where: {
        published: true,
      },
    })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject('no results returned');
      });
  });
};

module.exports.getPostById = (id) => {
  return new Promise((resolve, reject) => {
    Post.findAll({
      where: {
        postID: id,
      },
    })
      .then((data) => {
        resolve(data[0]);
      })
      .catch((err) => {
        reject('no results returned');
      });
  });
};

module.exports.getPostByMinDate = (date) => {
  return new Promise((resolve, reject) => {
    const { gte } = Sequelize.Op;
    Post.findAll({
      where: {
        postDate: {
          [gte]: new Date(minDateStr),
        },
      },
    })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject('no results returned');
      });
  });
};

module.exports.getCategories = () => {
  return new Promise((resolve, reject) => {
    Category.findAll()
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject('no results returned');
      });
  });
};

module.exports.getPostsByCategory = (id) => {
  return new Promise((resolve, reject) => {
    Post.findAll({
      where: {
        categoryID: id,
      },
    })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject('no results returned');
      });
  });
};

module.exports.addPost = (postData) => {
  return new Promise((resolve, reject) => {
    postData.published = postData.published ? true : false;

    for (field in postData) {
      if (postData[field] == '') {
        postData[field] = null;
      }
    }
    postData.postDate = new Date();

    Post.create(postData)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject('unable to create post');
      });
  });
};

module.exports.getPublishedPostsByCategory = (id) => {
  return new Promise((resolve, reject) => {
    Post.findAll({
      where: {
        published: true,
        categoryID: id,
      },
    })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject('no results returned');
      });
  });
};

module.exports.addCategory = (categoryData) => {
  return new Promise((resolve, reject) => {
    for (field in categoryData) {
      if (categoryData[field] == '') {
        categoryData[field] = null;
      }
    }

    Category.create(categoryData)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject('unable to create category');
      });
  });
};

module.exports.deleteCategoryById = (id) => {
  return new Promise((resolve, reject) => {
    Category.destroy({
      where: { categoryID: id },
    })
      .then(() => {
        resolve('destroyed');
      })
      .catch((err) => {
        reject('unable to delete category');
      });
  });
};

module.exports.deletePostById = (id) => {
  return new Promise((resolve, reject) => {
    Post.destroy({
      where: { postID: id },
    })
      .then(() => {
        resolve('destroyed');
      })
      .catch((err) => {
        reject('unable to delete post');
      });
  });
};
