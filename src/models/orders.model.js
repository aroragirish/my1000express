const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    business: {
      businessId: {
        type: String,
        required: true,
      },
      amountInvested: {
        type: Number,
        required: true,
      },
      minInvestment: {
        type: Number,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
    },
    status: {
      type: String,
      required: true,
      default: 'Pending',
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
