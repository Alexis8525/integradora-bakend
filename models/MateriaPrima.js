import mongoose from "mongoose";
const { Schema, model } = mongoose;

const materiaPrimaSchema = new Schema({
  nombre: { type: String, required: true },
  categoria: String,
  unidadMedida: String,
  stock: Number,
  stockMinimo: Number,
  proveedores: [{ type: Schema.Types.ObjectId, ref: "Proveedor" }],
  precioPromedioUnitario: Number,
  fechaActualizacion: { type: Date, default: Date.now },
  Estado: { type: String, enum: ["Suficiente", "Bajo", "Agotado"] },
});

export default model("MateriaPrima", materiaPrimaSchema);
