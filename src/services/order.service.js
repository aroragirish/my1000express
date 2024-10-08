const { Orders } = require('../models');
// const { s3 } = require('./AWSService');
// const config = require('../config/config');

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

const getOrderById = async (orderId) => {
  const order = await Orders.findById(orderId);
  return order;
};

const getAllOrders = async () => {
  const orders = await Orders.find();
  return orders;
};
const deleteOrder = async (_id) => {
  const order = await Orders.findOne({ _id });
  if (order.status === 'Pending') {
    return order.updateOne({ status: 'Cancelled' });
    // s3.deleteObject(
    //   {
    //     Key: order.image.split('/').pop(),
    //     Bucket: config.aws.s3Bucket,
    //   },
    //   async (err) => {
    //     if (err) {
    //       throw new Error(`Unable to delete: ${err}`);
    //     } else {
    //     }
    //   }
    // );
  }
  throw new Error(`Unable to delete: Order is not pending`);
};

module.exports = {
  createOrders,
  getMyOrders,
  getAllOrders,
  deleteOrder,
  getOrderById,
};
