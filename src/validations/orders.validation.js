const Joi = require('joi');

const createOrder = {
  body: Joi.object().keys({
    user: Joi.string(),
    business: Joi.object().keys({
      businessId: Joi.string(),
      amountInvested: Joi.number(),
      minInvestment: Joi.number(),
    }),
    status: Joi.string().required(),
    trsId: Joi.string(),
    description: Joi.string(),
    image: Joi.string(),
  }),
};

module.exports = {
  createOrder,
};
