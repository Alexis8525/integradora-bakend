import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ventaSchema = new Schema({
  fecha: { type: Date, default: Date.now },
  cliente: { type: Schema.Types.ObjectId, ref: "Usuario" },
  empleado: { type: Schema.Types.ObjectId, ref: "Usuario" },
  metodoPago: { type: String, enum: ["efectivo", "tarjeta", "transferencia"] },
  productos: [
    {
      producto: { type: Schema.Types.ObjectId, ref: "Producto" },
      cantidad: Number,
      precioUnitario: Number,
      subtotal: Number
    }
  ],
  total: Number,
  estado: { type: String, enum: ["pagado", "cancelado"], default: "pagado" }
});

export default model("Venta", ventaSchema);
