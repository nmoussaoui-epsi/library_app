const express = require("express");
const router = express.Router();
const empruntController = require("../controllers/empruntController");

router.get("/", empruntController.getAll);
router.get("/:uuid", empruntController.getById);
router.post("/", empruntController.create);
router.delete("/:uuid", empruntController.restituer); // restitution

module.exports = router;
