import mongoose from "mongoose";
const { Schema, model } = mongoose;

const recetaSchema = new Schema({
  nombre: { type: String, required: true },
  productoFinal: { type: Schema.Types.ObjectId, ref: "Producto" },
  ingredientes: [
    {
      materiaPrima: { type: Schema.Types.ObjectId, ref: "MateriaPrima" },
      cantidad: Number,
      unidadMedida: String,
      categoria: String
    }
  ],
  produccionDiaria: Schema.Types.Mixed,
  costoTotal: Number,
  margenGanancia: Number,
  fechaActualizacion: { type: Date, default: Date.now }
});

export default model("Receta", recetaSchema);
