const Joi = require('joi');

const createBusiness = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    category: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    preTaxReturns: Joi.number().required(),
    tenure: Joi.number().required(),
    tax: Joi.number().required(),
    tenureDuration: Joi.string().required().valid('weeks', 'months', 'years'),
    minInvestment: Joi.number().required(),
    perShare: Joi.number().required(),
    extraInfo: Joi.string(),
  }),
};

module.exports = {
  createBusiness,
};
