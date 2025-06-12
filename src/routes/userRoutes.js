const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getAll);
router.get("/:uuid", userController.getById);
router.post("/", userController.create);
router.put("/:uuid", userController.update);
router.delete("/:uuid", userController.delete);

module.exports = router;
