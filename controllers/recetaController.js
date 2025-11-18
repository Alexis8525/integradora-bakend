import Receta from "../models/Receta.js";

export const getRecetas = async (req, res) => {
  try {
    const recetas = await Receta.find()
      .populate("productoFinal")
      .populate("ingredientes.materiaPrima");
    res.json(recetas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRecetaById = async (req, res) => {
  try {
    const receta = await Receta.findById(req.params.id)
      .populate("productoFinal")
      .populate("ingredientes.materiaPrima");
    if (!receta) return res.status(404).json({ message: "Receta no encontrada" });
    res.json(receta);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createReceta = async (req, res) => {
  try {
    const nueva = new Receta(req.body);
    await nueva.save();
    res.status(201).json(nueva);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateReceta = async (req, res) => {
  try {
    const actualizada = await Receta.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actualizada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteReceta = async (req, res) => {
  try {
    await Receta.findByIdAndDelete(req.params.id);
    res.json({ message: "Receta eliminada" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
