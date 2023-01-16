const mongoose = require('mongoose');

const categorySchema = mongoose.Schema(
  {
    value: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    label: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

categorySchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
