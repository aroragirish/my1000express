const httpStatus = require('http-status');
const { Business, User } = require('../models');
const ApiError = require('../utils/ApiError');
const { getUserById } = require('./user.service');

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

const updateBusinessForOrderComplete = async (business, id) => {
  const businessFromDb = await Business.findById(business.businessId);
  if (businessFromDb.minInvestment > business.amountInvested) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Minimum amount is wrong!');
  }
  const newTargetAchieved = businessFromDb.targetAchieved + business.amountInvested;
  const newTotalSubscribers = businessFromDb.totalSubscribers + 1;
  const investorArray = businessFromDb.investers;
  const userFromDb = await getUserById(id);
  investorArray.push(userFromDb);
  const businesses = await Business.findOneAndUpdate(
    { _id: business.businessId },
    {
      targetAchieved: newTargetAchieved,
      totalSubscribers: newTotalSubscribers,
      investers: investorArray,
    },
    { upsert: false },
    (err) => {
      if (err) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Unknown error 123');
      }
    }
  );
  businesses.save();
  return businesses;
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
  updateBusinessForOrderComplete,
};
