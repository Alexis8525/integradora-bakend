import mongoose from "mongoose";
const { Schema, model } = mongoose;

const proveedorSchema = new Schema({
  nombre: { type: String, required: true },
  marca: String,
  telefono: String,
  email: String,
  direccion: String,
  productosSuministrados: [
    {
      materiaPrima: { type: Schema.Types.ObjectId, ref: "MateriaPrima" },
      costoCaja: Number,
      cantidadPorCaja: Number,
      precioUnitario: Number,
      unidadMedida: String
    }
  ],
  fechaRegistro: { type: Date, default: Date.now },
  activo: { type: Boolean, default: true }
});

export default model("Proveedor", proveedorSchema);
