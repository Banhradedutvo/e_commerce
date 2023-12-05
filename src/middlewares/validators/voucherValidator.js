const Joi = require('joi');

const voucherValidator = Joi.object({
    code: Joi.string().required(),
    value: Joi.number().required(),
    created_at: Joi.number().optional(),
});

module.exports = voucherValidator;