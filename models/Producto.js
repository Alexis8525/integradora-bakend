import mongoose from "mongoose";
const { Schema, model } = mongoose;

const productoSchema = new Schema({
  nombre: { type: String, required: true },
  categoria: String,
  descripcion: String,
  precioVenta: Number,
  costoProduccion: Number,
  unidadMedida: String,
  imagen: String,
  stock: Number,
  stockMinimo: Number,
  receta: { type: Schema.Types.ObjectId, ref: "Receta" },
  sucursal: { type: Schema.Types.ObjectId, ref: "Sucursal" },
  activo: { type: Boolean, default: true }
});

export default model("Producto", productoSchema);
