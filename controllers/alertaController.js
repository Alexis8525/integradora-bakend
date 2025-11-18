import Alerta from "../models/Alerta.js";
import Inventario from "../models/Inventario.js";

export const crearAlerta = async (req, res) => {
  try {
    const nuevaAlerta = new Alerta(req.body);
    await nuevaAlerta.save();
    res.status(201).json({ mensaje: "Alerta creada correctamente", nuevaAlerta });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear alerta", error });
  }
};

export const obtenerAlertas = async (req, res) => {
  try {
    const alertas = await Alerta.find().populate("enviadoA").sort({ fecha: -1 });
    res.status(200).json(alertas);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener alertas", error });
  }
};

export const obtenerAlertaPorId = async (req, res) => {
  try {
    const alerta = await Alerta.findById(req.params.id).populate("enviadoA");
    if (!alerta) return res.status(404).json({ mensaje: "Alerta no encontrada" });
    res.status(200).json(alerta);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener alerta", error });
  }
};

export const actualizarAlerta = async (req, res) => {
  try {
    const alertaActualizada = await Alerta.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!alertaActualizada) return res.status(404).json({ mensaje: "Alerta no encontrada" });
    res.status(200).json({ mensaje: "Alerta actualizada correctamente", alertaActualizada });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar alerta", error });
  }
};

export const eliminarAlerta = async (req, res) => {
  try {
    const alertaEliminada = await Alerta.findByIdAndDelete(req.params.id);
    if (!alertaEliminada) return res.status(404).json({ mensaje: "Alerta no encontrada" });
    res.status(200).json({ mensaje: "Alerta eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar alerta", error });
  }
};

export const generarAlertasInventario = async (req, res) => {
  try {
    const productosBajoStock = await Inventario.find({ stock: { $lt: 5 } });
    if (productosBajoStock.length === 0) return res.status(200).json({ mensaje: "Sin alertas de inventario" });

    const alertas = productosBajoStock.map((producto) => ({
      tipo: "inventario",
      mensaje: `El producto "${producto.nombre}" tiene un stock bajo (${producto.stock}).`,
      nivel: "advertencia",
      relacionadoCon: producto._id,
      accionSugerida: "Reabastecer inventario",
      estado: "pendiente",
      fecha: new Date(),
      medio: "app"
    }));

    await Alerta.insertMany(alertas);
    res.status(201).json({ mensaje: "Alertas de inventario generadas", alertas });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al generar alertas de inventario", error });
  }
};
