const express = require("express");
const router = express.Router();
const empruntController = require("../controllers/empruntController");

router.get("/", empruntController.getAllEmprunts);
router.post("/", empruntController.createEmprunt);
router.delete("/:id", empruntController.deleteEmprunt);

module.exports = router;
