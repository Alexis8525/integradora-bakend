import express from "express";
import {
  getProducciones,
  getProduccionById,
  createProduccion,
  updateProduccion,
  deleteProduccion,
} from "../controllers/produccionController.js";

const router = express.Router();

router.get("/", getProducciones);
router.get("/:id", getProduccionById);
router.post("/", createProduccion);
router.put("/:id", updateProduccion);
router.delete("/:id", deleteProduccion);

export default router;
