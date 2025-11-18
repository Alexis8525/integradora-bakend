// controllers/productoController.js
import Producto from "../models/Producto.js";
import multer from "multer";
import path from "path";
import fs from "fs";

// 📸 Configuración de almacenamiento de imágenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "uploads/productos";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // Ej: 172345343.png
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // límite 5MB
}).single("imagen"); // nombre del campo del archivo

// 🔹 Crear producto con imagen
export const createProducto = async (req, res) => {
  try {
    const { nombre, categoria, descripcion, precioVenta, stock } = req.body;

    let imagen = null;
    if (req.file) {
      imagen = `/uploads/productos/${req.file.filename}`;
    }

    const nuevo = new Producto({
      nombre,
      categoria,
      descripcion,
      precioVenta,
      stock,
      imagen,
    });

    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 🔹 Otros controladores sin cambios
export const getProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductoById = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProducto = async (req, res) => {
  try {
    const actualizado = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteProducto = async (req, res) => {
  try {
    await Producto.findByIdAndDelete(req.params.id);
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
