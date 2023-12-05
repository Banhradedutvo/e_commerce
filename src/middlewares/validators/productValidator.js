const Joi = require('joi');
 const productValidator = Joi.object({
    product_id: Joi.string().required(),
    name: Joi.string().min(3).max(100).required(),
    category: Joi.string().required(),
    price: Joi.number().required(),
    sale: Joi.boolean(),
    quantity: Joi.number().integer().min(1).required(), 
    imageUrl: Joi.string().uri().required(),
    description: Joi.string().max(500), 
    company: Joi.string().required()
})
module.exports = productValidator;