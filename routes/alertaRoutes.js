import express from "express";
import {
  crearAlerta,
  obtenerAlertas,
  obtenerAlertaPorId,
  actualizarAlerta,
  eliminarAlerta,
  generarAlertasInventario,
} from "../controllers/alertaController.js";

const router = express.Router();

router.post("/", crearAlerta);
router.get("/", obtenerAlertas);
router.get("/:id", obtenerAlertaPorId);
router.put("/:id", actualizarAlerta);
router.delete("/:id", eliminarAlerta);
router.post("/generar/inventario", generarAlertasInventario);

export default router;
