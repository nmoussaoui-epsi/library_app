const db = require("./db");

const getAllEmprunts = async () => {
  const { rows } = await db.query("SELECT * FROM emprunts");
  return rows;
};

const getEmpruntById = async (uuid) => {
  const { rows } = await db.query("SELECT * FROM emprunts WHERE uuid = $1", [
    uuid,
  ]);
  return rows[0];
};

const createEmprunt = async ({
  utilisateur_id,
  ressource_id,
  date_emprunt,
  date_retour,
}) => {
  const { rows } = await db.query(
    `INSERT INTO emprunts (utilisateur_id, ressource_id, date_emprunt, date_retour)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [utilisateur_id, ressource_id, date_emprunt, date_retour]
  );

  await db.query(`UPDATE ressources SET disponible = FALSE WHERE uuid = $1`, [
    ressource_id,
  ]);

  return rows[0];
};

const restituerEmprunt = async (uuid) => {
  const emprunt = await getEmpruntById(uuid);
  if (!emprunt) return null;

  await db.query("UPDATE ressources SET disponible = TRUE WHERE uuid = $1", [
    emprunt.ressource_id,
  ]);
  await db.query("DELETE FROM emprunts WHERE uuid = $1", [uuid]);

  return emprunt;
};

module.exports = {
  getAllEmprunts,
  getEmpruntById,
  createEmprunt,
  restituerEmprunt,
};
