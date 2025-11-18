import mongoose from "mongoose";
const { Schema, model } = mongoose;

const inventarioSchema = new Schema({
  tipoMovimiento: { type: String, enum: ["entrada", "salida", "ajuste"], required: true },
  referencia: { type: String, enum: ["venta", "compra", "produccion", "desperdicio"] },
  fecha: { type: Date, default: Date.now },
  materiaPrima: { type: Schema.Types.ObjectId, ref: "MateriaPrima" },
  cantidad: Number,
  unidadMedida: String,
  usuario: { type: Schema.Types.ObjectId, ref: "Usuario" },
  observaciones: String
});

export default model("Inventario", inventarioSchema);
