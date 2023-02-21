const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const orderValidation = require('../../validations/orders.validation');
const orderController = require('../../controllers/order.controller');
const { upload } = require('../../services/AWSService');

const router = express.Router();

router
  .use(upload.fields([{ name: 'image' }]))
  .route('/add-order')
  .post(auth('addOrder'), validate(orderValidation.createOrder), orderController.createOrder);
router.delete('/delete/:id', auth('deleteOrder'), orderController.deleteOrder);
router.route('/get-my-orders').get(auth('getOrderById'), orderController.getMyOrder);
router.route('/get-All-orders').get(auth('getOrder'), orderController.getAllOrder);
router.route('/approve-order/:orderId').get(auth('approveOrder'), orderController.approveOrder);

module.exports = router;
