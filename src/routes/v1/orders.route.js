const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const orderValidation = require('../../validations/orders.validation');
const orderController = require('../../controllers/order.controller');

const router = express.Router();



router.route('/add-order').post(auth('addOrder'), validate(orderValidation.createOrder), orderController.createOrder);

router.route('/get-my-orders').get(auth('getOrderById'), orderController.getMyOrder);
router.route('/get-All-orders').get(auth('getOrder'), orderController.getAllOrder);


module.exports = router;
