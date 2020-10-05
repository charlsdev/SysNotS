const { Schema, model } = require('mongoose');

const NotasSchema = new Schema({
   titulo: {
      type: String,
      required: true
   },
   descripcion: {
      type: String,
      required: true
   },
   userid: {
      type: String,
      required: true
   }
}, {
   timestamps: true
})

module.exports = model('Notas', NotasSchema);