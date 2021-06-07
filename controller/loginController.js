const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const User = require('../model/People');

// get login page
const getlogin = (req, res) => {
  res.render('index');
};

// user login
const loginUser = async (req, res, next) => {
  try {
    // find user emial or mobile number
    const user = await User.findOne({
      $or: [{ email: req.body.username }, { mobile: req.body.username }],
    });
    if (user && user._id) {
      const isValidPassword = await bcrypt.compare(req.body.password, user.password);
      if (isValidPassword) {
        // jwt make token
        const userObject = {
          username: user.name,
          mobile: user.mobile,
          email: user.email,
          role: user.role,
        };

        // generate token
        const token = jwt.sign(userObject, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRY,
        });

        // set cookie
        res.cookie(process.env.COOKIE_NAME, token, {
          maxAge: process.env.JWT_EXPIRY,
          httpOnly: true,
          signed: true,
        });

        // set logged in user lcoal identifire
        res.locals.loggedInUser = userObject;
        res.render('inbox');
      } else {
        throw createError('Login failed! Please try agin.');
      }
    } else {
      throw createError('Login failed! Please try agin.');
    }
  } catch (err) {
    res.render('index', {
      data: {
        username: req.body.username,
      },
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
};

// user logout

const logOut = (req, res) => {
  res.clearCookie('user_cookie');
  res.send('logged out');
};

module.exports = {
  getlogin,
  loginUser,
  logOut,
};
