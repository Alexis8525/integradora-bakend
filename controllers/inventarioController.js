import Inventario from "../models/Inventario.js";

export const obtenerInventario = async (req, res) => {
  try {
    const productos = await Inventario.find();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener inventario", error });
  }
};

export const agregarProducto = async (req, res) => {
  try {
    const nuevoProducto = new Inventario(req.body);
    await nuevoProducto.save();
    res.status(201).json({ mensaje: "Producto agregado correctamente", nuevoProducto });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al agregar producto", error });
  }
};

export const actualizarProducto = async (req, res) => {
  try {
    const productoActualizado = await Inventario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!productoActualizado) return res.status(404).json({ mensaje: "Producto no encontrado" });
    res.status(200).json({ mensaje: "Producto actualizado correctamente", productoActualizado });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar producto", error });
  }
};

export const eliminarProducto = async (req, res) => {
  try {
    const productoEliminado = await Inventario.findByIdAndDelete(req.params.id);
    if (!productoEliminado) return res.status(404).json({ mensaje: "Producto no encontrado" });
    res.status(200).json({ mensaje: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar producto", error });
  }
};

export const buscarProducto = async (req, res) => {
  try {
    const { q } = req.query;
    const productos = await Inventario.find({
      $or: [
        { nombre: { $regex: q, $options: "i" } },
        { categoria: { $regex: q, $options: "i" } },
      ],
    });
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al buscar producto", error });
  }
};
