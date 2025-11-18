import express from "express";
import {
  getRecetas,
  getRecetaById,
  createReceta,
  updateReceta,
  deleteReceta,
} from "../controllers/recetaController.js";

const router = express.Router();

router.get("/", getRecetas);
router.get("/:id", getRecetaById);
router.post("/", createReceta);
router.put("/:id", updateReceta);
router.delete("/:id", deleteReceta);

export default router;
