import Sucursal from "../models/Sucursal.js";

export const getSucursales = async (req, res) => {
  try {
    const sucursales = await Sucursal.find().populate("encargado");
    res.json(sucursales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSucursalById = async (req, res) => {
  try {
    const sucursal = await Sucursal.findById(req.params.id).populate("encargado");
    if (!sucursal) return res.status(404).json({ message: "Sucursal no encontrada" });
    res.json(sucursal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createSucursal = async (req, res) => {
  try {
    const nueva = new Sucursal(req.body);
    await nueva.save();
    res.status(201).json(nueva);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateSucursal = async (req, res) => {
  try {
    const actualizada = await Sucursal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actualizada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteSucursal = async (req, res) => {
  try {
    await Sucursal.findByIdAndDelete(req.params.id);
    res.json({ message: "Sucursal eliminada" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
