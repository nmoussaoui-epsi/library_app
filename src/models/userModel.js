const db = require("./db");

const getAllUsers = async () => {
  const { rows } = await db.query("SELECT * FROM users");
  return rows;
};

const getUserById = async (uuid) => {
  const { rows } = await db.query("SELECT * FROM users WHERE uuid = $1", [
    uuid,
  ]);
  return rows[0];
};

const createUser = async (user) => {
  const { nom, prenom, email, phone, nationalite } = user;
  const { rows } = await db.query(
    `INSERT INTO users (nom, prenom, email, phone, nationalite)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [nom, prenom, email, phone, nationalite]
  );
  return rows[0];
};

const updateUser = async (uuid, user) => {
  const { nom, prenom, email, phone, nationalite } = user;
  const { rows } = await db.query(
    `UPDATE users
     SET nom = $1, prenom = $2, email = $3, phone = $4, nationalite = $5
     WHERE uuid = $6 RETURNING *`,
    [nom, prenom, email, phone, nationalite, uuid]
  );
  return rows[0];
};

const deleteUser = async (uuid) => {
  await db.query("DELETE FROM users WHERE uuid = $1", [uuid]);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
