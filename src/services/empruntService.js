const knex = require('../models/db');

async function hasUserEmprunts(utilisateur_id) {
  const result = await knex('emprunts').where({ utilisateur_id }).first();
  return !!result;
}

async function createEmprunt(data) {
  const emprunt = {
    utilisateur_id: data.utilisateur_id,
    ressource_id: data.ressource_id,
    date_emprunt: data.date_emprunt,
    date_retour: data.date_retour
  };
  const [created] = await knex('emprunts').insert(emprunt).returning('*');
  return created;
}

async function getAllEmprunts() {
  return await knex('emprunts').select('*');
}

async function getEmpruntById(id) {
  return await knex('emprunts').where({ id }).first();
}

async function deleteEmprunt(id) {
  await knex('emprunts').where({ id }).del();
}

module.exports = {
  hasUserEmprunts,
  createEmprunt,
  getAllEmprunts,
  getEmpruntById,
  deleteEmprunt
};
