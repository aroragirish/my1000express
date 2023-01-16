const express = require('express');
const validate = require('../../middlewares/validate');
const categoryValidation = require('../../validations/category.validation');
const categoryController = require('../../controllers/category.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.route('/').get(validate(categoryValidation.getCategories), categoryController.getAllCategories);

router
  .route('/add-category')
  .post(auth('createCategory'), validate(categoryValidation.createCategory), categoryController.createCategory);
module.exports = router;
