const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
// const logger = require('../config/logger');

const { authService, userService, tokenService, emailService } = require('../services');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

const sendOtp = catchAsync(async (req, res) => {
  const otpCode = Math.floor(Math.random() * 1000000 + 1);
  await userService.sendEmailOtp(otpCode, req.body);

  res.status(200).send({
    message: 'OTP Sent Successfully',
  });
});

const verifyOtp = catchAsync(async (req, res) => {
  const isVerified = await userService.verifyEmailOtp(req.body);

  if (isVerified) {
    const user = await userService.checkIfUserRegistered(req.body.email);
    if (user) {
      const tokens = await tokenService.generateAuthTokens(user);
      res.status(200).send({
        message: 'OTP verified Successfully',
        user,
        tokens,
        registered: true,
      });
    } else {
      res.status(200).send({
        message: 'OTP verified Successfully',
        registered: false,
        email: req.body.email,
      });
    }
  } else {
    res.status(401).send({
      message: 'OTP is either invalid or expired',
    });
  }
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(200).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  sendOtp,
  verifyOtp,
};
