const jwt = require('jsonwebtoken');

const checkLogin = (req, res, next) => {
  const cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

  if (cookies) {
    try {
      const token = cookies[process.env.COOKIE_NAME];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      //   pass user info to response locals
      if (res.locals.html) {
        res.locals.loggedInUser = decoded;
      }
      next();
    } catch (err) {
      if (res.locals.html) {
        res.redirect('/');
      } else {
        res.status(500).json({
          errors: {
            common: { msg: 'Authentication failed!' },
          },
        });
      }
    }
  } else if (res.locals.html) {
    res.redirect('/');
  } else {
    res.status(401).json({
      errors: 'Authentication failed!',
    });
  }
};

// redirecct logged in users
const redirectLoggedInUser = (req, res, next) => {
  const cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
  if (!cookies) {
    next();
  } else {
    res.redirect('/inbox');
  }
};

module.exports = { checkLogin, redirectLoggedInUser };
