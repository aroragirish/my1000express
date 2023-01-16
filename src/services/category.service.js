const { Category } = require('../models');

const getAllCategories = async () => {
  const result = await Category.find();
  return result;
};

const createCategory = async (userBody) => {
  const category = await Category.create(userBody);
  return category;
};

module.exports = {
  getAllCategories,
  createCategory,
};
