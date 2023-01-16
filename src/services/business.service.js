const httpStatus = require('http-status');
const { Business, User } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} businessBody
 * @returns {Promise<Business>}
 */
const createBusiness = async (businessBody) => {
  if (!(await User.isEmailTaken(businessBody.email))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email is not registered with us!');
  }
  return Business.create(businessBody);
};

const getAllBusiness = async () => {
  const businesses = await Business.find();
  return businesses;
};

const getAllBusinessByCategory = async (category) => {
  if (category === 'all') {
    const businesses = await Business.find();
    return businesses;
  }
  const businesses = await Business.find({ category });
  return businesses;
};

const getBusinessById = async (_id) => {
  const business = await Business.findOne({ _id });
  return business;
};

module.exports = {
  createBusiness,
  getAllBusiness,
  getAllBusinessByCategory,
  getBusinessById,
};
