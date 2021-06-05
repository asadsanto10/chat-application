const createError = require('http-errors');

// 404 not found
const notFounfound = (req, res, next) => {
  next(createError(404, 'your request was not found'));
};

// dafault error handeler
const errorHandeler = (err, req, res, next) => {
  //   res.render('error', {
  //     title: 'error page',
  //   });

  res.locals.error = process.env.NODE_ENV === 'development' ? err : { message: err.message };

  res.status(err.status || 500);

  if (res.locals.html) {
    // html response
    res.render('error', {
      title: 'error page',
    });
  } else {
    //   json res
    res.json(res.locals.error);
  }
};

module.exports = {
  notFounfound,
  errorHandeler,
};
