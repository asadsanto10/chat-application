const htmlResponse = (pageTitle) => (req, res, next) => {
  res.locals.html = true;
  res.locals.title = `${pageTitle}-chat application`;
  res.locals.loggedInUser = {};
  res.locals.errors = {};
  res.locals.data = {};
  next();
};

module.exports = htmlResponse;
