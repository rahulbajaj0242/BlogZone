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
