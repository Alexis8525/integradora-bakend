import express from "express";
import {
  getMateriasPrimas,
  getMateriaPrimaById,
  createMateriaPrima,
  updateMateriaPrima,
  deleteMateriaPrima,
} from "../controllers/materiaPrimaController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/",verifyToken, getMateriasPrimas);
router.get("/:id",verifyToken, getMateriaPrimaById);
router.post("/", verifyToken,createMateriaPrima);
router.put("/:id", verifyToken,updateMateriaPrima);
router.delete("/:id",verifyToken, deleteMateriaPrima);

export default router;
