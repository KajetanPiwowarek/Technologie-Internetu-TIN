var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const actorRouter = require('./routes/actorRoute');
const roleRouter = require('./routes/roleRoute');
const filmRouter = require('./routes/filmRoute');
const actorApiRouter = require('./routes/api/ActorApiRoute');
const filmApiRouter = require('./routes/api/FilmApiRoute');
const roleApiRouter = require('./routes/api/RoleApiRoute');

const sequelizeInit = require('./config/sequelize/init');
sequelizeInit()
  .catch(err => {
    console.log(err);
  });

var app = express();

const fmt = require('./utils/dateFormatting');
app.use((req, res, next) => {
  res.locals.fmt = fmt;
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/actors', actorRouter);
app.use('/roles', roleRouter);
app.use('/films', filmRouter);
app.use('/api/actors', actorApiRouter);
app.use('/api/films', filmApiRouter);
app.use('/api/roles', roleApiRouter);

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
