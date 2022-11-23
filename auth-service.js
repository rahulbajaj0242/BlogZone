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

let Company = mongoose.model('web322_companies', companySchema);

module.exports.initialize = function () {
  return new Promise(function (resolve, reject) {
    let db = mongoose.createConnection('connectionString');
    db.on('error', (err) => {
      reject(err); // reject the promise with the provided error
    });
    db.once('open', () => {
      User = db.model('users', userSchema);
      resolve();
    });
  });
};
