
const Joi = require('joi');

const userSchema = Joi.object({
  nom: Joi.string().max(100).required(),
  prenom: Joi.string().max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().max(20).optional(),
  nationalite: Joi.string().max(100).optional()
});

module.exports = { userSchema };
