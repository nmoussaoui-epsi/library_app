
const { empruntSchema } = require('../models/empruntModel');
const empruntService = require('../services/empruntService');

const getAllEmprunts = async (req, res) => {
  try {
    const emprunts = await empruntService.getAllEmprunts();
    res.json(emprunts);
  } catch (error) {
    console.error('Erreur getAllEmprunts:', error);
    res.status(500).json({ message: 'Une erreur est survenue.' });
  }
};

const createEmprunt = async (req, res) => {
  try {
    const { error } = empruntSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const newEmprunt = await empruntService.createEmprunt(req.body);
    res.status(201).json(newEmprunt);
  } catch (error) {
    console.error('Erreur createEmprunt:', error);
    res.status(500).json({ message: 'Une erreur est survenue.' });
  }
};

const deleteEmprunt = async (req, res) => {
  try {
    const id = req.params.id;
    await empruntService.deleteEmprunt(id);
    res.json({ message: 'Emprunt supprimé avec succès.' });
  } catch (error) {
    console.error('Erreur deleteEmprunt:', error);
    res.status(500).json({ message: 'Une erreur est survenue.' });
  }
};

module.exports = {
  getAllEmprunts,
  createEmprunt,
  deleteEmprunt
};
