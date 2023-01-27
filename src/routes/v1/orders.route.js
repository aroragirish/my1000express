const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const multer = require('multer');
const AWS = require('aws-sdk');
const path = require('path');
const multerS3 = require('multer-s3');
const orderValidation = require('../../validations/orders.validation');
const orderController = require('../../controllers/order.controller');

const router = express.Router();
const accessKeyId = process.env.AWS_ACCESS_KEY || 'AKIAZF74Z4RND6J6A5FA';
const secretAccessKey = process.env.AWS_SECRET_KEY || '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';

AWS.config.update({
  accessKeyId,
  secretAccessKey,
});

const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'my1000bucket',
    metadata(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, `${Date.now().toString()}${ext}`);
    },
  }),
});

router
  .use(upload.fields([{ name: 'image' }]))
  .route('/add-order')
  .post(auth('addOrder'), validate(orderValidation.createOrder), orderController.createOrder);

router.route('/get-my-orders').get(auth('getOrderById'), orderController.getMyOrder);
router.route('/get-All-orders').get(auth('getOrder'), orderController.getAllOrder);

module.exports = router;
