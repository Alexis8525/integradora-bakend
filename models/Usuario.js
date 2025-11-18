import mongoose from "mongoose";
const { Schema, model } = mongoose;

const usuarioSchema = new Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: { type: String, enum: ["admin", "empleado", "cliente"], required: true },
  telefono: String,
  sucursal: { type: Schema.Types.ObjectId, ref: "Sucursal" },
  fechaRegistro: { type: Date, default: Date.now },
  activo: { type: Boolean, default: true }
});

export default model("Usuario", usuarioSchema);
