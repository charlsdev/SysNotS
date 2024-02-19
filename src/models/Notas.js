const { Schema, model } = require('mongoose');

const User = model('User');

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
      // type: String,
      // required: true
      type: Schema.ObjectId, ref: "User"
   }
}, {
   timestamps: true,
   versionKey: false
})

module.exports = model('Notas', NotasSchema);