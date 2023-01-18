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

const fetchBusinessByCat = {
  body: Joi.object().keys({
    page: Joi.number().required(),
    perPage: Joi.number(),
  }),
};

const approveBusiness = {
  body: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

module.exports = {
  createBusiness,
  fetchBusinessByCat,
  approveBusiness,
};
