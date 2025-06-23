
const Joi = require('joi');

const resourceSchema = Joi.object({
  titre: Joi.string().max(255).required(),
  type: Joi.string().max(50).required(),
  auteur: Joi.string().max(255).optional(),
  disponible: Joi.boolean().optional()
});

module.exports = { resourceSchema };
