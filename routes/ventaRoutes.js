import express from "express";
import {
  registrarVenta,
  obtenerVentas,
  obtenerVentaPorId,
  eliminarVenta
} from "../controllers/ventaController.js";

const router = express.Router();

router.post("/", registrarVenta);
router.get("/", obtenerVentas);
router.get("/:id", obtenerVentaPorId);
router.delete("/:id", eliminarVenta);

export default router;
