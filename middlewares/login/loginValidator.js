const { check, validationResult } = require('express-validator');

const loginValidator = [
  check('username').isLength({ min: 1 }).withMessage('Email or Mobile Number must be required'),
  check('password').isLength({ min: 1 }).withMessage('Password must be required'),
];

const loginValidatorHandeler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.render('index', {
      data: {
        username: req.body.username,
      },
      errors: mappedErrors,
    });
  }
};

module.exports = { loginValidator, loginValidatorHandeler };
