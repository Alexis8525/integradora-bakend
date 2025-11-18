import express from "express";
import { loginUsuario } from "../controllers/authController.js";
import { registrarCliente } from "../controllers/authController.js";

const router = express.Router();

// ✅ Registro solo para clientes
router.post("/register", registrarCliente);

// ✅ Login general
router.post("/login", loginUsuario);

export default router;
