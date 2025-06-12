const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');

router.get('/', resourceController.getAll);
router.get('/:uuid', resourceController.getById);
router.post('/', resourceController.create);
router.put('/:uuid', resourceController.update);
router.delete('/:uuid', resourceController.delete);

module.exports = router;