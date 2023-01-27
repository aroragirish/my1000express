const mongoose = require('mongoose');
const { User } = require('./user.model');

const orderSchema = mongoose.Schema(
  {
    user: {
      type: String,
      required: false,
    },
    business: {
      businessId: {
        type: String,
        required: false,
      },
      amountInvested: {
        type: Number,
        required: false,
      },
      minInvestment: {
        type: Number,
        required: false,
      },
    },
    status: {
      type: String,
      required: true,
    },
    trsId: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Orders = mongoose.model('orders', orderSchema);

module.exports = Orders;
