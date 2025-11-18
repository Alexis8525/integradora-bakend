import Compra from "../models/Compra.js";

export const getCompras = async (req, res) => {
  try {
    const compras = await Compra.find()
      .populate("proveedor")
      .populate("materiasPrimas.materiaPrima")
      .populate("usuarioResponsable");
    res.json(compras);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCompraById = async (req, res) => {
  try {
    const compra = await Compra.findById(req.params.id)
      .populate("proveedor")
      .populate("materiasPrimas.materiaPrima")
      .populate("usuarioResponsable");
    if (!compra) return res.status(404).json({ message: "Compra no encontrada" });
    res.json(compra);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCompra = async (req, res) => {
  try {
    const nueva = new Compra(req.body);
    await nueva.save();
    res.status(201).json(nueva);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCompra = async (req, res) => {
  try {
    const actualizada = await Compra.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actualizada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCompra = async (req, res) => {
  try {
    await Compra.findByIdAndDelete(req.params.id);
    res.json({ message: "Compra eliminada" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
