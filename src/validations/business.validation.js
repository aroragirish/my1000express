const Joi = require('joi');

const createBusiness = {
  body: Joi.object().keys({
    logo: Joi.string(),
    email: Joi.string().required(),
    category: Joi.string(),
    categoryTags: Joi.array().items(Joi.string()),
    totalSubscribers: Joi.number(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    targetToRaise: Joi.number(),
    targetAchieved: Joi.number(),

    documents: Joi.array().items(Joi.string()),
    keyFeature: Joi.string(),
    approved: Joi.boolean(),
    minInvestment: Joi.number().required(),

    extraInfo: Joi.string(),
    image: Joi.string(),
    aboutCompany: Joi.object().keys({
      tradeName: Joi.string().required(),
      incorporationDate: Joi.date().required(),
      firm: Joi.string().required(),
      empCount: Joi.number().required(),
      website: Joi.string().required(),
      location: Joi.string().required(),
      socialMediaLinks: Joi.array().items(Joi.string()),
    }),
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
