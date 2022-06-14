const express = require('express');
const app = express();
const accountRoute = express.Router();
// account model
let Account = require('../model/Account');
// Add account
accountRoute.route('/add-account').post((req, res, next) => {
  Account.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});
// Get all account
accountRoute.route('/').get((req, res) => {
  Account.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})
// Get single account
accountRoute.route('/read-account/:id').get((req, res) => {
  Account.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update account
accountRoute.route('/update-account/:id').put((req, res, next) => {
  Account.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Account successfully updated!')
    }
  })
})
// Delete account
accountRoute.route('/delete-account/:id').delete((req, res, next) => {
  Account.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})
module.exports = accountRoute;