const Joi = require('joi');

const blogValidator = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    author: Joi.string().required(),
    category: Joi.string().required(),
});

module.exports = blogValidator;