const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const categoryRouter = require('./routes/category');
const cartRouter = require('./routes/cart');
const Category = require('./models/category')


const mongoose = require('mongoose');  //db referansı

const app = express();

app.use(session({
  secret: 'askjdna34jfna453453faısf53bhu',
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: new Date(253402300799999), 
  }
}));


app.use((req, res, next) => {
  Category.find()    
    .then((cate)=>{
      res.locals.categories=cate;
      res.locals.user = req.session.user;
      next();
    })   
});
 


mongoose.connect('mongodb://127.0.0.1:27017/MovieDb')  //db ismi il
.then(()=>console.log('mongoDb Conneted..'))   //bağlanıesa
.catch((err)=>{console.log('mongoDb Connection error')});   //hata verirse balantı
// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/movies', moviesRouter);
app.use('/category', categoryRouter);
app.use('/cart', cartRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
