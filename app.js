require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./app_server/routes/index');
const usersRouter = require('./app_server/routes/users');
const travelRouter = require('./app_server/routes/travel');
const apiRouter = require('./app_api/routes/index');

const handlebars = require('hbs');
const passport = require('passport');
require('./app_api/config/passport');
require('./app_api/models/db');

const { expressjwt: jwt } = require('express-jwt');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));

// register handlebars partials 
handlebars.registerPartials(path.join(__dirname, 'app_server', 'views/partials'));

app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

// enable CORS for Angular frontend
app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

// Protect only POST, PUT, DELETE requests under /api/trips
app.use('/api/trips', (req, res, next) => {
  if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
    return jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] })(req, res, next);
  }
  next();
});

// wire up routes to controllers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/travel', travelRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).send('404: Page Not Found');
});

// general error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500).send(`Error: ${err.message}`);
});

// Catch unauthorized error and create 401
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ message: err.name + ": " + err.message });
  } else {
    next(err);
  }
});

module.exports = app;
