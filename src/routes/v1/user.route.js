const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');
const { upload } = require('../../services/AWSService');

const router = express.Router();

router
  .route('/')
  .post(auth('manageUsers'), validate(userValidation.createUser), userController.createUser)
  .get(auth('getUsers'), validate(userValidation.getUsers), userController.getUsers);

router
  .route('/:userId')
  .get(auth('getUsers'), validate(userValidation.getUser), userController.getUser)
  .patch(auth('manageUsers'), validate(userValidation.updateUser), userController.updateUser)
  .delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.deleteUser);

router.route('/update-bank-details').post(auth('addBankDetails'), validate(userValidation.addBank), userController.addBank);

router
  .use(upload.fields([{ name: 'pan' }, { name: 'aadhar' }]))
  .route('/update-kyc-documents')
  .post(auth('addBankDetails'), userController.updateKyc);

module.exports = router;
