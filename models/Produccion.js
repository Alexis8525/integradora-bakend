import mongoose from "mongoose";
const { Schema, model } = mongoose;

const produccionSchema = new Schema({
  fecha: { type: Date, default: Date.now },
  producto: { type: Schema.Types.ObjectId, ref: "Producto" },
  cantidadProducida: Number,
  materiasUtilizadas: [
    {
      materiaPrima: { type: Schema.Types.ObjectId, ref: "MateriaPrima" },
      cantidadUsada: Number,
      unidadMedida: String
    }
  ],
  responsable: { type: Schema.Types.ObjectId, ref: "Usuario" },
  observaciones: String
});

export default model("Produccion", produccionSchema);
