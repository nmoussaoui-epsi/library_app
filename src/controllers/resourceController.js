
const { resourceSchema } = require('../models/resourceModel');
const resourceService = require('../services/resourceService');

const getAllResources = async (req, res) => {
  try {
    const resources = await resourceService.getAllResources();
    res.json(resources);
  } catch (error) {
    console.error('Erreur getAllResources:', error);
    res.status(500).json({ message: 'Une erreur est survenue.' });
  }
};

const getResourceById = async (req, res) => {
  try {
    const resource = await resourceService.getResourceById(req.params.id);
    if (!resource) return res.status(404).json({ message: 'Ressource non trouvée.' });
    res.json(resource);
  } catch (error) {
    console.error('Erreur getResourceById:', error);
    res.status(500).json({ message: 'Une erreur est survenue.' });
  }
};

const createResource = async (req, res) => {
  try {
    const { error } = resourceSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const newResource = await resourceService.createResource(req.body);
    res.status(201).json(newResource);
  } catch (error) {
    console.error('Erreur createResource:', error);
    res.status(500).json({ message: 'Une erreur est survenue.' });
  }
};

const updateResource = async (req, res) => {
  try {
    const existing = await resourceService.getResourceById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Ressource non trouvée.' });

    const { error } = resourceSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const updated = await resourceService.updateResource(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    console.error('Erreur updateResource:', error);
    res.status(500).json({ message: 'Une erreur est survenue.' });
  }
};

const deleteResource = async (req, res) => {
  try {
    const existing = await resourceService.getResourceById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Ressource non trouvée.' });

    await resourceService.deleteResource(req.params.id);
    res.json({ message: 'Ressource supprimée avec succès.' });
  } catch (error) {
    console.error('Erreur deleteResource:', error);
    res.status(500).json({ message: 'Une erreur est survenue.' });
  }
};

module.exports = {
  getAllResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource
};
