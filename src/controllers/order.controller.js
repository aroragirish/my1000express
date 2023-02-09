const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { orderService } = require('../services');

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
module.exports = {
  createOrder,
  getMyOrder,
  getAllOrder,
  deleteOrder,
};
