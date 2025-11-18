import mongoose from "mongoose";
const { Schema, model } = mongoose;

const sucursalSchema = new Schema({
  nombre: { type: String, required: true },
  direccion: String,
  telefono: String,
  encargado: { type: Schema.Types.ObjectId, ref: "Usuario" }
});

export default model("Sucursal", sucursalSchema);
