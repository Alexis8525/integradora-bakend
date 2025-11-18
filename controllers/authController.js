import Usuario from "../models/Usuario.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar el usuario
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ success: false, message: "Usuario no encontrado" });
    }

    // Comparar contraseñas
    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return res.status(401).json({ success: false, message: "Contraseña incorrecta" });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      success: true,
      message: "Inicio de sesión exitoso",
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      },
      token
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ success: false, message: "Error en el servidor" });
  }
};


// ✅ REGISTRO de usuarios tipo "cliente"
export const registrarCliente = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    // Verificar si ya existe el correo
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ success: false, message: "El correo ya está registrado" });
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Crear nuevo usuario tipo cliente
    const nuevoUsuario = new Usuario({
      nombre,
      email,
      password: passwordHash,
      rol: "cliente",
      activo: true,
    });

    await nuevoUsuario.save();

    // Crear token
    const token = jwt.sign(
      { id: nuevoUsuario._id, rol: nuevoUsuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(201).json({
      success: true,
      message: "Cliente registrado exitosamente",
      usuario: {
        id: nuevoUsuario._id,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email,
        rol: nuevoUsuario.rol,
      },
      token,
    });
  } catch (error) {
    console.error("Error al registrar cliente:", error);
    res.status(500).json({ success: false, message: "Error en el servidor" });
  }
};

