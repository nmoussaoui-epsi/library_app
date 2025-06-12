const userService = require("../models/userModel");

exports.getAll = async (req, res) => {
  const users = await userService.getAllUsers();
  res.json(users);
};

exports.getById = async (req, res) => {
  const user = await userService.getUserById(req.params.uuid);
  if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });
  res.json(user);
};

exports.create = async (req, res) => {
  const newUser = await userService.createUser(req.body);
  res.status(201).json(newUser);
};

exports.update = async (req, res) => {
  const updated = await userService.updateUser(req.params.uuid, req.body);
  res.json(updated);
};

exports.delete = async (req, res) => {
  await userService.deleteUser(req.params.uuid);
  res.status(204).end();
};
