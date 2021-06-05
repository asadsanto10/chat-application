const { check, validationResult } = require('express-validator');
const { unlink } = require('fs');
const createError = require('http-errors');
const path = require('path');
const User = require('../model/People');
// user validator
const userValidator = [
  check('name')
    .isLength({ min: 1 })
    .withMessage('Name is required')
    .isAlpha('en-US', { ignore: ' -' })
    .withMessage('Name must be contain anything other than alphabet')
    .trim(),
  check('email')
    .isLength({ min: 1 })
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email is required')
    .trim()
    // check database if user already exist
    .custom(async (value) => {
      try {
        const user = User.findOne({ email: value });
        if (user) {
          throw createError('Email already exist');
        }
      } catch (err) {
        throw createError(err.nessage);
      }
    }),
  check('mobile')
    .isLength({ min: 1 })
    .withMessage('Email is required')
    .isMobilePhone('bn-BD', { strictMode: true })
    .withMessage('Mobile number must be a valid Bangladesh mobile number')
    // check database if mobile number already exist
    .custom(async (value) => {
      try {
        const user = User.findOne({ mobile: value });
        if (user) {
          throw createError('Mobile already exist');
        }
      } catch (err) {
        throw createError(err.nessage);
      }
    }),
  check('password')
    .isLength({ min: 1 })
    .withMessage('Password is required')
    .isStrongPassword()
    .withMessage(
      'password must be at least 8 charecter long and should contain at least 1 lowercase'
    ),
  check('repassword')
    .isLength({ min: 1 })
    .withMessage('Retype password is required')
    .isStrongPassword()
    .withMessage(
      'password must be at least 8 charecter long and should contain at least 1 lowercase'
    )
    .matches('password')
    .withMessage('password must maches'),
];

const addUserValidatorHandelar = (req, res, next) => {
  const error = validationResult(req);
  const mappError = error.mapped();
  if (Object.keys(mappError).length === 0) {
    next();
  } else {
    // remove uploaded files
    // eslint-disable-next-line no-lonely-if
    if (req.files.length > 0) {
      const { filename } = req.files[0];
      unlink(path.join(__dirname, `./../public/uploads/avatars/${filename}`));
      // eslint-disable-next-line no-unused-expressions
      (err) => {
        if (err) console.log(err);
      };
    }

    // response the error
    res.status(500).json({
      errors: mappError,
    });
  }
};

module.exports = {
  userValidator,
  addUserValidatorHandelar,
};
