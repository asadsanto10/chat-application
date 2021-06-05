const uploader = require('../utilitis/singleUploader');

const avaterUpload = (req, res, next) => {
  const upload = uploader(
    'avatars',
    ['image/jpeg', 'image/jpg', 'image/png'],
    1000,
    'only .jpg, jpeg or .png formate allowd'
  );

  // call the middleware function
  upload.any()(req, res, (err) => {
    if (err) {
      res.status(500).json({
        errors: {
          avater: {
            msg: err.message,
          },
        },
      });
    } else {
      next();
    }
  });
};

module.exports = avaterUpload;
