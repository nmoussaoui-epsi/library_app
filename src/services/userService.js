const knex = require('../models/db');

async function getAllUsers() {
  return await knex('users').select('*');
}

async function getUserById(id) {
  return await knex('users').where({ id }).first();
}

async function createUser(userData) {
  const user = {
    nom: userData.nom,
    prenom: userData.prenom,
    email: userData.email,
    phone: userData.phone,
    nationalite: userData.nationalite
  };
  const [created] = await knex('users').insert(user).returning('*');
  return created;
}

async function updateUser(id, userData) {
  await knex('users').where({ id }).update(userData);
  return getUserById(id);
}

async function deleteUser(id) {
  await knex('users').where({ id }).del();
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
