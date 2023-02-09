const AWS = require('aws-sdk');
const multer = require('multer');
const path = require('path');
const multerS3 = require('multer-s3');
const config = require('../config/config');

const accessKeyId = config.aws.accessKey;
const secretAccessKey = config.aws.secretKey;
const { s3Bucket } = config.aws;

AWS.config.update({
  accessKeyId,
  secretAccessKey,
});
const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3,
    bucket: s3Bucket,
    metadata(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, `${Date.now().toString()}${ext}`);
    },
  }),
});

module.exports = {
  s3,
  upload,
};
