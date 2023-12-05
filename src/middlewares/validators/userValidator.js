const Joi = require("joi");

const userValidator = {
  validateUser: (user) => {
    const schema = Joi.object({
      user_name: Joi.string().min(6).max(20).required(),
      password: Joi.string().min(6).required(),
      confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'Mật khẩu xác nhận không khớp',
      }),
      role: Joi.string().default("customer"),
      full_name: Joi.string(),
      email: Joi.string().email().min(6).max(50).optional(),
      phone: Joi.string().min(6).max(20).optional(),
      ward_id: Joi.string().optional(),
      address_detail: Joi.string().optional(),
    });

    return schema.validate(user);
  },
};

module.exports = userValidator;