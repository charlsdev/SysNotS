const { Schema, model} = require('mongoose');

const Comments = new Schema({
   usuario : {
      type: String,
      required: true
   },
   username : {
      type: String,
      required: true
   },
   comentario : {
      type: String,
      required: true
   },
   profile : {
      type: String,
      required: true
   }
}, {
   timestamps: true
});

module.exports = model('Comentarios', Comments);