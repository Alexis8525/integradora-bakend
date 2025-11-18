import Proveedor from "../models/Proveedor.js";

export const getProveedores = async (req, res) => {
  try {
    const proveedores = await Proveedor.find().populate("productosSuministrados.materiaPrima");
    res.json(proveedores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProveedorById = async (req, res) => {
  try {
    const proveedor = await Proveedor.findById(req.params.id).populate("productosSuministrados.materiaPrima");
    if (!proveedor) return res.status(404).json({ message: "Proveedor no encontrado" });
    res.json(proveedor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProveedor = async (req, res) => {
  try {
    const nuevo = new Proveedor(req.body);
    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateProveedor = async (req, res) => {
  try {
    const actualizado = await Proveedor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteProveedor = async (req, res) => {
  try {
    await Proveedor.findByIdAndDelete(req.params.id);
    res.json({ message: "Proveedor eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
