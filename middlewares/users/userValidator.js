const { check, validationResult } = require('express-validator');
const { unlink } = require('fs');
const createError = require('http-errors');
const path = require('path');
const User = require('../../model/People');
// user validator
const userValidator = [
  check('name')
    .isLength({ min: 1 })
    .withMessage('Name is required')
    .isAlpha('en-US', { ignore: ' -' })
    .withMessage('Name must not contain anything other than alphabet')
    .trim(),
  check('email')
    .isEmail()
    .withMessage('Invalid email address')
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          throw createError('Email already is use!');
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check('mobile')
    .isLength({ min: 1 })
    .withMessage('mobile is required')
    // .isMobilePhone('bn-BD', {
    //   strictMode: true,
    // })
    // .withMessage('Mobile number must be a valid Bangladeshi mobile number')
    .custom(async (value) => {
      try {
        const user = await User.findOne({ mobile: value });
        if (user) {
          throw createError('Mobile already is use!');
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check('password').isLength({ min: 1 }).withMessage('password is required'),
  // .isStrongPassword()
  // .withMessage(
  //   'Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol'
  // ),
  check('repassword')
    .isLength({ min: 1 })
    .withMessage('Retype password is required')
    .custom(async (repassword, { req }) => {
      const { password } = req.body;

      // If password and confirm password not same
      // don't allow to sign up and throw error
      if (password !== repassword) {
        throw createError('Passwords must be same');
      }
    }),
];

const addUserValidatorHandelar = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    // remove uploaded files
    if (req.files.length > 0) {
      const { filename } = req.files[0];
      unlink(path.join(__dirname, `/../public/uploads/avatars/${filename}`), (err) => {
        if (err) console.log(err);
      });
    }

    // response the errors
    res.status(500).json({
      errors: mappedErrors,
    });
  }
};

module.exports = {
  userValidator,
  addUserValidatorHandelar,
};
