const multer = require('multer');
const path = require('path');
const createError = require('http-errors');

const uploader = (subfolderPath, allowedFileType, maxFileSize, errormsg) => {
  // make uploade object
  const uploadFolder = `${__dirname}./../public/uploads/${subfolderPath}/`;

  // define stroage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadFolder);
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);
      const filename = `${file.originalname
        .replace(fileExt, '')
        .toLowerCase()
        .split(' ')
        .join('-')}-${Date.now()}`;
      cb(null, filename + fileExt);
    },
  });

  // prepear the final upload object for multer
  const upload = multer({
    storage,
    limits: {
      fileSize: maxFileSize,
    },
    fileFilter: (req, file, cb) => {
      if (allowedFileType.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(createError(errormsg));
      }
    },
  });

  return upload;
};

module.exports = uploader;
