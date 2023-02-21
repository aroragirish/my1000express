const mongoose = require('mongoose');
const { User } = require('./user.model');

const businessSchema = mongoose.Schema(
  {
    logo: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    categoryTags: {
      type: [String],
      required: false,
    },
    category: {
      type: String,
      required: false,
    },
    payout: {
      type: String,
      required: true,
      default: 'monthly',
    },
    tenure: {
      type: Number,
      required: true,
    },
    tenureUnit: {
      type: String,
      required: true,
      default: 'months',
    },
    totalSubscribers: {
      type: Number,
      required: false,
      default: 0,
    },
    targetToRaise: {
      type: Number,
      required: false,
      default: 0,
    },
    targetAchieved: {
      type: Number,
      required: false,
      default: 0,
    },
    minInvestment: {
      type: Number,
      required: true,
    },
    documents: {
      type: [Object],
      required: false,
    },
    keyFeature: {
      type: String,
      required: false,
    },
    extraInfo: {
      type: String,
      required: false,
    },
    approved: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      required: false,
    },
    aboutCompany: {
      tradeName: {
        type: String,
        required: true,
      },
      incorporationDate: {
        type: Date,
        required: true,
      },
      firm: {
        type: String,
        required: true,
      },
      empCount: {
        type: Number,
        required: true,
      },
      website: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
      socialMediaLinks: {
        type: [String],
        required: true,
      },
    },
    investers: {
      type: [User],
      required: false,
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
