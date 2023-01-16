const Joi = require('joi');

const getCategories = {};

const createCategory = {
  body: Joi.object().keys({
    value: Joi.string().required(),
    label: Joi.string().required(),
  }),
};

module.exports = {
  getCategories,
  createCategory,
};
