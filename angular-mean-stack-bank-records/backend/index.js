const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Connecting mongoDB
mongoose
  .connect('mongodb+srv://vaibhavt:vaibhav@cluster0.8ihl0.mongodb.net/Bank_Account_Records')
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err.reason)
  })

// Set up express js port
const accountRoute = require('./routes/account.route')

const app = express()
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  }));
app.use(cors())

// Setting up static directory
app.use(
  express.static(
    path.join(__dirname, 'dist/angular-mean-stack-bank-records')));

// RESTful API root
app.use('/api', accountRoute)

// PORT
const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// Find 404 and hand over to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// Index Route
app.get('/', (req, res) => {
  res.send('invaild endpoint')
});

app.get('*', (req, res) => {
  res.sendFile(
    path.join(__dirname, 'dist/angular-mean-stack-bank-records/index.html'),
  )
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message)
  if (!err.statusCode) err.statusCode = 500
  res.status(err.statusCode).send(err.message)
});