import express from "express";


const router = express.Router();
const planetsController = require("../controllers/planets");

router.get("/", planetsController.getAll);
router.get("/:id", planetsController.getOneById);
router.post("/", planetsController.create);
router.put("/:id", planetsController.updateById);
router.delete("/:id", planetsController.deleteById);

module.exports = router;

