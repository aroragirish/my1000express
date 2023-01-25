const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const path = require('path');
const multerS3 = require('multer-s3');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const businessValidation = require('../../validations/business.validation');
const businessController = require('../../controllers/business.controller');

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
// limit repeated failed requests to auth endpoints

router.route('/').get(businessController.getAllBusiness);

router.route('/getBusinessesForUser').get(auth('getBusinessesForUser'), businessController.getBusinessesForUser);

router
  .route('/category/:category')
  .post(validate(businessValidation.fetchBusinessByCat), businessController.getAllBusinessByCategory);

router.route('/:id').get(auth('getBusinessById'), businessController.getBusinessById);
router.route('/delete/:id').delete(auth('deleteBusiness'), businessController.deleteBusiness);

router
  .route('/approve')
  .post(auth('approveBusiness'), validate(businessValidation.approveBusiness), businessController.approveBusiness);

router
  .use(upload.fields([{ name: 'documents', maxCount: 5 }, { name: 'image' }]))
  .route('/add-business')
  .post(auth('addBusiness'), validate(businessValidation.createBusiness), businessController.createBusiness);

module.exports = router;
