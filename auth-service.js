var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  userName: {
    type: String,
    unique: true,
  },
  password: String,
  email: String,
  loginHistory: [{ dateTime: Date, userAgent: String }],
});

// let Company = mongoose.model('web322_companies', companySchema);
let User;

module.exports.initialize = () => {
  return new Promise((resolve, reject) => {
    let db = mongoose.createConnection(
      'mongodb+srv://dbUser:hnu6yxq-hjd-bht4JZU@senecaweb.xbzg820.mongodb.net/?retryWrites=true&w=majority'
    );
    db.on('error', (err) => {
      reject(err);
    });
    db.once('open', () => {
      User = db.model('users', userSchema);
      resolve();
    });
  });
};

module.exports.registerUser = (userData) => {
  return new Promise((resolve, reject) => {
    if (userData.password != userData.password2) {
      reject('Passwords do not match');
    } else {
      let newUser = new User(userData);
      newUser
        .save()
        .then(() => {
          resolve();
        })
        .catch((err) => {
          if (err.code == 11000) {
            reject('User Name already taken');
          } else {
            reject('There was an error creating the user: ' + err);
          }
        });
    }
  });
};

module.exports.checkUser = (userData) => {
  return new Promise((resolve, reject) => {
    User.find({ userName: userData.userName })
      .exec()
      .then((users) => {
        if (users.length === 0) {
          reject('Unable to find user: ' + userData.userName);
        }
        if (users[0].password != userData.password) {
          reject('Incorrect Password for user: ' + userData.userName);
        } else {
          users[0].loginHistory.push({
            dateTime: newDate().toString(),
            userAgent: userData.userAgent,
          });
          User.updateOne(
            { userName: users[0].userName },
            { $set: { loginHistory: users[0].loginHistory } }
          )
            .exec()
            .then(() => {
              resolve(users[0]);
            })
            .catch((err) => {
              reject('There was an error verifying the user: ' + err);
            });
        }
      })
      .catch(() => {
        reject('Unable to find user:  ' + userData.userName);
      });
  });
};
