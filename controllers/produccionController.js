import Produccion from "../models/Produccion.js";

export const getProducciones = async (req, res) => {
  try {
    const producciones = await Produccion.find()
      .populate("producto")
      .populate("materiasUtilizadas.materiaPrima")
      .populate("responsable");
    res.json(producciones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProduccionById = async (req, res) => {
  try {
    const produccion = await Produccion.findById(req.params.id)
      .populate("producto")
      .populate("materiasUtilizadas.materiaPrima")
      .populate("responsable");
    if (!produccion) return res.status(404).json({ message: "Producción no encontrada" });
    res.json(produccion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduccion = async (req, res) => {
  try {
    const nueva = new Produccion(req.body);
    await nueva.save();
    res.status(201).json(nueva);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateProduccion = async (req, res) => {
  try {
    const actualizada = await Produccion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actualizada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteProduccion = async (req, res) => {
  try {
    await Produccion.findByIdAndDelete(req.params.id);
    res.json({ message: "Producción eliminada" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
