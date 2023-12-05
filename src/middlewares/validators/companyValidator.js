const Joi = require('joi');

const companyValidator = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().email().required(),
});

module.exports = companyValidator;