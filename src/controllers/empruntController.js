const empruntService = require("../models/empruntModel");

exports.getAll = async (req, res) => {
  const emprunts = await empruntService.getAllEmprunts();
  res.json(emprunts);
};

exports.getById = async (req, res) => {
  const emprunt = await empruntService.getEmpruntById(req.params.uuid);
  if (!emprunt) return res.status(404).json({ error: "Emprunt non trouvé" });
  res.json(emprunt);
};

exports.create = async (req, res) => {
  const { utilisateur_id, ressource_id, date_emprunt, date_retour } = req.body;
  const created = await empruntService.createEmprunt({
    utilisateur_id,
    ressource_id,
    date_emprunt,
    date_retour,
  });
  res.status(201).json(created);
};

exports.restituer = async (req, res) => {
  const emprunt = await empruntService.restituerEmprunt(req.params.uuid);
  if (!emprunt) return res.status(404).json({ error: "Emprunt non trouvé" });
  res.status(200).json({ message: "Ressource restituée avec succès" });
};
