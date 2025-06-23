const knex = require('./db');

async function initDatabase() {
  // users
  const hasUsers = await knex.schema.hasTable('users');
  if (!hasUsers) {
    await knex.schema.createTable('users', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.string('nom', 100).notNullable();
      table.string('prenom', 100).notNullable();
      table.string('email', 255).notNullable().unique();
      table.string('phone', 20);
      table.string('nationalite', 100);
    });
    console.log('Table "users" créée.');
  }

  // ressources
  const hasRessources = await knex.schema.hasTable('ressources');
  if (!hasRessources) {
    await knex.schema.createTable('ressources', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.string('titre', 255).notNullable();
      table.string('type', 50).notNullable();
      table.string('auteur', 255);
      table.boolean('disponible').defaultTo(true);
    });
    console.log('Table "ressources" créée.');
  }

  // emprunts
  const hasEmprunts = await knex.schema.hasTable('emprunts');
  if (!hasEmprunts) {
    await knex.schema.createTable('emprunts', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.uuid('utilisateur_id').notNullable();
      table.uuid('ressource_id').notNullable();
      table.date('date_emprunt').notNullable();
      table.date('date_retour').notNullable();
      table.foreign('utilisateur_id').references('id').inTable('users');
      table.foreign('ressource_id').references('id').inTable('ressources');
    });
    console.log('Table "emprunts" créée.');
  }
}

module.exports = { initDatabase };
