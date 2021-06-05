// ? external emport
const express = require('express');
const env = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const login = require('./router/login');
const user = require('./router/user');
const inbox = require('./router/inbox');

env.config({ path: './.env' });
const app = express();
// databse connect
require('./database/connect');

//! internal import
const { notFounfound, errorHandeler } = require('./middlewares/errorHandeler');

// request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view engin
app.set('view engine', 'ejs');

// set static path
app.use(express.static(path.join(__dirname, 'public')));

// parse cookies
app.use(cookieParser(process.env.COOKI_SECRET));

// routing setup
app.use('/', login);
app.use('/users', user);
app.use('/inbox', inbox);

// 404 not found handeling
app.use(notFounfound);
app.use(errorHandeler);

// listing
app.listen(process.env.PORT, () => {
  console.log(`listen to port ${process.env.PORT}`);
});
