const db = require('./db');

const getAllResources = async () => {
    const { rows } = await db.query('SELECT * FROM ressources');
    return rows;
};

const getResourceById = async (uuid) => {
    const { rows } = await db.query('SELECT * FROM ressources WHERE uuid = $1', [uuid]);
    return rows[0];
};

const createResource = async (resource) => {
    const { titre, type, auteur, disponible } = resource;
    const { rows } = await db.query(
        `INSERT INTO ressources (titre, type, auteur, disponible)
     VALUES ($1, $2, $3, $4) RETURNING *`,
        [titre, type, auteur, disponible]
    );
    return rows[0];
};

const updateResource = async (uuid, resource) => {
    const { titre, type, auteur, disponible } = resource;
    const { rows } = await db.query(
        `UPDATE ressources
     SET titre = $1, type = $2, auteur = $3, disponible = $4
     WHERE uuid = $5 RETURNING *`,
        [titre, type, auteur, disponible, uuid]
    );
    return rows[0];
};

const deleteResource = async (uuid) => {
    await db.query('DELETE FROM ressources WHERE uuid = $1', [uuid]);
};

module.exports = {
    getAllResources,
    getResourceById,
    createResource,
    updateResource,
    deleteResource,
};