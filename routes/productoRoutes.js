// routes/productoRoutes.js
import express from "express";
import {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
  upload,
} from "../controllers/productoController.js";

const router = express.Router();
import { verifyToken } from "../middlewares/verifyToken.js";

router.get("/", getProductos);
router.get("/:id", getProductoById);
router.post("/", upload, createProducto); // 👈 aquí se usa multer
router.put("/:id", updateProducto);
router.delete("/:id", deleteProducto);

export default router;
