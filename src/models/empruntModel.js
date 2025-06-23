
const Joi = require('joi');

const empruntSchema = Joi.object({
  utilisateur_id: Joi.string().uuid().required(),
  ressource_id: Joi.string().uuid().required(),
  date_emprunt: Joi.date().required(),
  date_retour: Joi.date().required()
});

module.exports = { empruntSchema };
