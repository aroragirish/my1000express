const mongoose = require('mongoose');

const businessSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    preTaxReturns: {
      type: Number,
      required: true,
    },
    tenure: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
    },
    tenureDuration: {
      type: String,
      required: true,
      default: 'months',
    },
    minInvestment: {
      type: Number,
      required: true,
    },
    perShare: {
      type: Number,
      required: true,
    },
    extraInfo: {
      type: String,
    },
    approved: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

businessSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

const Business = mongoose.model('Business', businessSchema);

module.exports = Business;
