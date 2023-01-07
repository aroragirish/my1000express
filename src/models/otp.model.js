/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const UserOTPVerificationSchema = mongoose.Schema({
  email: String,
  otp: String,
  createdAt: Date,
  expiresAt: Date,
},
  {
    timestamps: true,
  });

UserOTPVerificationSchema.plugin(toJSON);

const Otp = mongoose.model('Otp', UserOTPVerificationSchema);

module.exports = Otp;
