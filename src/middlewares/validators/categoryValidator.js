const Joi = require('joi');

const categoryValidator = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional(),
});

module.exports = categoryValidator;