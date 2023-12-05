const Joi = require('joi');

const commentValidator = Joi.object({
    blog_id: Joi.string().required(),
    user_id: Joi.string().required(),
    content: Joi.string().required(),
});

module.exports = commentValidator;