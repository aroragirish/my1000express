const httpStatus = require('http-status');
const { Orders, User } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} orderBody
 * @returns {Promise<Orders>}
 */
const createOrders = async (orderBody) => {
  return Orders.create(orderBody);
};

const getMyOrders = async (userId) => {
  const orders = await Orders.find({ user: userId });
  return orders;
};
const getAllOrders = async () => {
  const orders = await Orders.find({ user: userId });
  return orders;
};

module.exports = {
  createOrders,
  getMyOrders,
  getAllOrders,
};
