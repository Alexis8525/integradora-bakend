import express from "express";
import {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} from "../controllers/usuarioController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getUsuarios);
router.get("/:id", verifyToken, getUsuarioById);
router.post("/",  createUsuario);
router.put("/:id", verifyToken, updateUsuario);
router.delete("/:id", verifyToken, deleteUsuario);

export default router;
