import mongoose from "mongoose";
const { Schema, model } = mongoose;

const compraSchema = new Schema({
  proveedor: { type: Schema.Types.ObjectId, ref: "Proveedor", required: true },
  materiasPrimas: [
    {
      materiaPrima: { type: Schema.Types.ObjectId, ref: "MateriaPrima" },
      cantidad: Number,
      precioUnitario: Number,
      subtotal: Number
    }
  ],
  totalCompra: Number,
  fechaCompra: { type: Date, default: Date.now },
  estado: { type: String, enum: ["pendiente", "recibida", "cancelada"], default: "pendiente" },
  usuarioResponsable: { type: Schema.Types.ObjectId, ref: "Usuario" }
});

export default model("Compra", compraSchema);
