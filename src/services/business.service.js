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
  const businesses = await Business.find({ approved: true });
  return businesses;
};

const getAllBusinessIncludingUnapproved = async () => {
  const businesses = await Business.find();
  return businesses;
};

const getAllBusinessByUser = async (email) => {
  const businesses = await Business.find({ email });
  return businesses;
};

const getAllBusinessByCategory = async (category, page, perPage) => {
  if (category === 'all') {
    const businesses = await Business.find({ approved: true })
      .skip(perPage * page)
      .limit(perPage);
    return businesses;
  }
  const businesses = await Business.find({ category, approved: true })
    .skip(perPage * page)
    .limit(perPage);
  return businesses;
};

const getBusinessById = async (_id) => {
  const business = await Business.findOne({ _id });
  return business;
};

const deleteBusinessById = async (_id) => {
  const business = await Business.deleteOne({ _id });
  return business;
};

const approveBusiness = async (_id) => {
  const business = await Business.findOneAndUpdate({ _id }, { approved: true }, { upsert: false }, (err) => {
    if (err) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email is not registered with us!');
    }
    return business;
  });
};

module.exports = {
  createBusiness,
  getAllBusiness,
  getAllBusinessByCategory,
  getBusinessById,
  getAllBusinessByUser,
  deleteBusinessById,
  getAllBusinessIncludingUnapproved,
  approveBusiness,
};
