const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const businessValidation = require('../../validations/business.validation');
const businessController = require('../../controllers/business.controller');
const { upload } = require('../../services/AWSService');

const router = express.Router();

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
