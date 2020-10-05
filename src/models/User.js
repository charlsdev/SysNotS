const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
   cedula: {
      type: String,
      required: true
   },
   apellidos: {
      type: String,
      required: true
   },
   nombres: {
      type: String,
      required: true
   },
   edad: {
      type: Number,
      required: true
   },
   genero: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   profile: {
      type: String,
      required: true
   },
   privilegio: {
      type: String,
      required: true
   },
   user: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   }
}, {
   timestamps: true
});

UserSchema.methods.encryptPassword = async password => {
   const salt = await bcrypt.genSalt(10);
   return await bcrypt.hash(password, salt);
}

UserSchema.methods.matchPassword = async function(password) {
   return await bcrypt.compare(password, this.password);
}

module.exports = model('User', UserSchema);