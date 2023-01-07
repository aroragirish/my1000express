const httpStatus = require('http-status');
const { User, Otp } = require('../models');
const { sendEmail } = require('./email.service');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return User.create(userBody);
};

const verifyEmailOtp = async (body) => {
  const otpData = await Otp.find({ email: body.email }).sort({ createdAt: -1 }).limit(1);
  // eslint-disable-next-line no-console
  console.log(otpData[0], body);
  return Number(body.otp) === Number(otpData[0].otp);
};

const checkIfUserRegistered = async (email) => {
  const userData = await User.findOne({ email });
  // eslint-disable-next-line no-console

  return userData;
};

const sendEmailOtp = async (otpCode, body) => {
  const otpData = new Otp({
    email: body.email,
    otp: otpCode,
    expiresAt: new Date().getTime() + 300 * 1000,
  });
  const otpResponse = await otpData.save();
  const subject = `${otpCode} - OTP for login to MY1000+`;
  const text = `${otpCode} - OTP for login to MY1000+
  DO NOT disclose it to anyone for security reasons.

  Regards,
  MY1000.biz.
  `;
  await sendEmail(body.email, subject, text);
  return otpResponse;
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  sendEmailOtp,
  verifyEmailOtp,
  checkIfUserRegistered,
};
