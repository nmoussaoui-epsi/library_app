const knex = require('../models/db');

async function getAllResources() {
  return await knex('ressources').select('*');
}

async function getResourceById(id) {
  return await knex('ressources').where({ id }).first();
}

async function createResource(data) {
  const resource = {
    titre: data.titre,
    type: data.type,
    auteur: data.auteur,
    disponible: data.disponible ?? true
  };
  const [created] = await knex('ressources').insert(resource).returning('*');
  return created;
}

async function updateResource(id, data) {
  await knex('ressources').where({ id }).update(data);
  return getResourceById(id);
}

async function deleteResource(id) {
  await knex('ressources').where({ id }).del();
}

module.exports = {
  getAllResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource
};
