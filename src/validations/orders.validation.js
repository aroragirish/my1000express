const Joi = require('joi');

const createOrder = {
  body: Joi.object().keys({
    user: Joi.string(),
    business: Joi.object().keys({
      businessId: Joi.string().required(),
      amountInvested: Joi.number().required(),
      minInvestment: Joi.number().required(),
      title: Joi.string().required(),
      category: Joi.string().required(),
    }),
    status: Joi.string().default('Pending'),
    trsId: Joi.string(),
    description: Joi.string(),
    image: Joi.string(),
  }),
};

const rejectOrder = {
  body: Joi.object().keys({
    id: Joi.string().required(),
    rejectText: Joi.string().required(),
  }),
};

module.exports = {
  createOrder,
  rejectOrder,
};
