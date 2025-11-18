import mongoose from "mongoose";
const { Schema, model } = mongoose;

const alertaSchema = new Schema({
  tipo: { type: String, enum: ["inventario", "compras", "producción", "proveedor", "sistema"], required: true },
  mensaje: { type: String, required: true },
  nivel: { type: String, enum: ["informativo", "advertencia", "crítico"], required: true },
  relacionadoCon: Schema.Types.Mixed,
  fecha: { type: Date, default: Date.now },
  accionSugerida: String,
  estado: { type: String, enum: ["pendiente", "enviado", "resuelto"], default: "pendiente" },
  enviadoA: [{ type: Schema.Types.ObjectId, ref: "Usuario" }],
  medio: { type: String, enum: ["WhatsApp", "email", "app"] }
});

export default model("Alerta", alertaSchema);
