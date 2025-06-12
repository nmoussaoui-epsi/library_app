const resourceService = require('../models/resourceModel');

exports.getAll = async (req, res) => {
    const resources = await resourceService.getAllResources();
    res.json(resources);
};

exports.getById = async (req, res) => {
    const resource = await resourceService.getResourceById(req.params.uuid);
    if (!resource) return res.status(404).json({ error: 'Ressource non trouvée' });
    res.json(resource);
};

exports.create = async (req, res) => {
    const newResource = await resourceService.createResource(req.body);
    res.status(201).json(newResource);
};

exports.update = async (req, res) => {
    const updated = await resourceService.updateResource(req.params.uuid, req.body);
    res.json(updated);
};

exports.delete = async (req, res) => {
    await resourceService.deleteResource(req.params.uuid);
    res.status(204).end();
};