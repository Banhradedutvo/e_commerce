const Joi = require('joi');

const cartValidator = Joi.object({
    user_id: Joi.string().required(),
    products: Joi.array().items(Joi.object({
        product_id: Joi.string().required(),
        quantity: Joi.number().integer().min(1).required(),
    })).required(),
});

module.exports = cartValidator;