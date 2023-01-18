const express = require('express');
const path = require('path');
const multer = require('multer');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const businessValidation = require('../../validations/business.validation');
const businessController = require('../../controllers/business.controller');

const router = express.Router();

const Storage = multer.diskStorage({
  destination: './public',
  filename: (req, image, cb) => {
    req.fileName = `${req.body.title}_${Date.now()}${path.extname(image.originalname)}`;
    cb(null, req.fileName);
  },
});

const upload = multer({
  storage: Storage,
}).single('image');
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
  .use(upload)
  .route('/add-business')
  .post(auth('addBusiness'), validate(businessValidation.createBusiness), businessController.createBusiness);

module.exports = router;
