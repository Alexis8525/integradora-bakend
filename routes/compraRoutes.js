import express from "express";
import {
  getCompras,
  getCompraById,
  createCompra,
  updateCompra,
  deleteCompra,
} from "../controllers/compraController.js";

const router = express.Router();

router.get("/", getCompras);
router.get("/:id", getCompraById);
router.post("/", createCompra);
router.put("/:id", updateCompra);
router.delete("/:id", deleteCompra);

export default router;
