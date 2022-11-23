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

module.exports.initialize = function () {
  return new Promise(function (resolve, reject) {
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
