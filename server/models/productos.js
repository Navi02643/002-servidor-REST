const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let productosSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es necesario"],
    unique: true,
  },
  preciounitario: {
    type: Number,
    required: [true, "El precio es necesario"],
  },
  categoria: {
    type: Schema.Types.ObjectId,
    ref: "Categoria",
    required: [true,"Es necesario una ID de categoria"]
  },
  disponible: {
    type: Boolean,
    required: [true, "La disponibilidad es necesaria"],
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: [true,"Es necesario una ID de usuario"]
  },
});

module.exports = mongoose.model("Productos", productosSchema);
