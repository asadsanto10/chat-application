const bcrypt = require('bcrypt');
const { unlink } = require('fs');
const path = require('path');
const User = require('../model/People');

// get users page
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.render('users', { users });
  } catch (err) {
    next(err);
  }
};

// add user
const addUSer = async (req, res, next) => {
  try {
    let newUser;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    if (req.files && req.files.length > 0) {
      newUser = new User({
        ...req.body,
        avatar: req.files[0].filename,
        password: hashedPassword,
      });
    } else {
      newUser = new User({
        ...req.body,
        password: hashedPassword,
      });
    }

    // save user
    await newUser.save();
    res.status(200).json({
      message: 'user was added successfully',
    });
  } catch (err) {
    res.status(500).json({
      error: {
        common: {
          msg: 'unknown error occurred',
        },
      },
    });
  }
};

// delete user
const removeUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete({ _id: req.params.id });

    // remove user avatar if any
    if (user.avatar) {
      unlink(path.join(__dirname, `/../public/uploads/avatars/${user.avatar}`), (err) => {
        if (err) console.log(err);
      });
    }
    res.status(200).json({
      message: 'user was remove successfully',
    });
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          msg: 'could no remove user !',
        },
      },
    });
  }
};
module.exports = {
  getUsers,
  addUSer,
  removeUser,
};
