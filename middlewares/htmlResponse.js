const htmlResponse = (pageTitle) => (req, res, next) => {
  res.locals.html = true;
  res.locals.title = `${pageTitle}-chat application`;
  next();
};

module.exports = htmlResponse;
