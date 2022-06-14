const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define collection and schema
let account = new Schema({
  account_name: {
    type: String
  },
  account_number: {
    type: Number
  },
  account_email: {
    type: String
  },
  phone: {
    type: Number
  },
  gender: {
    type: String
  },
  dob: {
    type: Date
  }
  
}, {
  collection: 'accounts'
})
module.exports = mongoose.model('Account', Account)