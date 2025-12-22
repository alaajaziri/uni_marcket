var express = require('express');
var logger = require('morgan');
var createError = require('http-errors');
require("./firebase");

var indexRouter = require('./routes/index');
var productsRouter = require('./routes/products');
var profileRouter = require('./routes/profile');
var mongoose = require("mongoose");

mongoose.connect("mongodb+srv://alaajaziri1122_db_user:OSDmbpNNTDyL2PgI@cluster0.nzxgohz.mongodb.net/?appName=uni_market")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));


var app = express();
const cors = require("cors");
app.use(cors());


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/profile', profileRouter)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// error handler
app.use(function (err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  res.json({
    error: err.message,
  });
});

module.exports = app;
