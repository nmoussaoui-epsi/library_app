
const { userSchema } = require('../models/userModel');
const userService = require('../services/userService');
const empruntService = require('../services/empruntService');

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error('Erreur getAllUsers:', error);
    res.status(500).json({ message: 'Une erreur est survenue.' });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    res.json(user);
  } catch (error) {
    console.error('Erreur getUserById:', error);
    res.status(500).json({ message: 'Une erreur est survenue.' });
  }
};

const createUser = async (req, res) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Erreur createUser:', error);
    res.status(500).json({ message: 'Une erreur est survenue.' });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });

    const { error } = userSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const updatedUser = await userService.updateUser(req.params.id, req.body);
    res.json(updatedUser);
  } catch (error) {
    console.error('Erreur updateUser:', error);
    res.status(500).json({ message: 'Une erreur est survenue.' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });

    const hasEmprunts = await empruntService.hasUserEmprunts(req.params.id);
    if (hasEmprunts) {
      return res.status(400).json({ message: 'Impossible de supprimer : emprunts associés.' });
    }

    await userService.deleteUser(req.params.id);
    res.json({ message: 'Utilisateur supprimé avec succès.' });
  } catch (error) {
    console.error('Erreur deleteUser:', error);
    res.status(500).json({ message: 'Une erreur est survenue.' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
