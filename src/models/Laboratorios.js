const { Schema, model } = require('mongoose');

const LabSchema = new Schema({
   cedula: {
      type: String,
      required: true
   },
   apename: {
      type: String,
      required: true
   },
   edad: {
      type: Number,
      required: true
   },
   sexo: {
      type: String,
      required: true
   },
   direccion: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   telefono: {
      type: String,
      required: true
   },
   nameLab: {
      type: String,
      required: true
   },
   direccionLab: {
      type: String,
      required: true
   },
   telefonoLab: {
      type: String,
      required: true
   }
}, {
   timestamps: true
});

module.exports = model('Laboratorios', LabSchema);