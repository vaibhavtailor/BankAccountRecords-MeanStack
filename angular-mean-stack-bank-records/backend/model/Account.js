const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Account = new Schema({
  account_name: {
    type: String
  },
  account_email: {
    type: String
  },
  account_number: {
    type: Number
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
  collection: 'AccountDetails'
})

module.exports = mongoose.model('Account', Account)
