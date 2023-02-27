const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { orderService, businessService, userService } = require('../services');

const createOrder = catchAsync(async (req, res) => {
  const body = {
    ...req.body,
    user: req.user._id,
    image: req.files.image[0].location,
  };
  const order = await orderService.createOrders(body);
  res.status(httpStatus.CREATED).send(order);
});

const getMyOrder = catchAsync(async (req, res) => {
  const orders = await orderService.getMyOrders(req.user._id);
  res.status(200).send(orders);
});
const getAllOrder = catchAsync(async (req, res) => {
  const orders = await orderService.getAllOrders();
  res.status(200).send(orders);
});
const deleteOrder = catchAsync(async (req, res) => {
  await orderService.deleteOrder(req.params.id);
  const orders = await orderService.getMyOrders(req.user._id);
  res.status(200).send(orders);
});

const approveOrder = catchAsync(async (req, res) => {
  const order = await orderService.getOrderById(req.params.orderId);
  if (order.status === 'Pending') {
    await businessService.updateBusinessForOrderComplete(order.business, order.user);
    await userService.updateUserForOrderComplete(order.business, order.user);
    await order.updateOne({ status: 'Completed' });
    res.status(200).send({
      message: 'Invesment updated',
    });
  } else {
    res.status(500).send({
      message: 'Order is not in pending or Minimum amount is not correct',
    });
  }
});

const rejectOrder = catchAsync(async (req, res) => {
  const { rejectText, id } = req.body;
  const order = await orderService.getOrderById(id);
  if (order.status === 'Pending') {
    await order.updateOne({ rejectText, status: 'Rejected' });
  } else {
    res.status(500).send({
      message: 'Order is not in pending',
    });
  }
});

module.exports = {
  createOrder,
  getMyOrder,
  getAllOrder,
  deleteOrder,
  approveOrder,
  rejectOrder,
};
