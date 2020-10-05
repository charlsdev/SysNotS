const notesControllers = {}

const Notas = require('../models/Notas');
const Comments = require('../models/Comment')

notesControllers.renderProfile = async (req, res) => {
   const userName = req.user.user;
   // const { nombres, apellidos, profile } = req.user;
   const { cedula, nombres, apellidos, profile, edad, genero, email } = req.user;

   const rolSys = req.user.privilegio;
   let admin = (rolSys == 'Admin');
   // console.log(rolSys);

   const numComments = await Comments.find({usuario: userName}).countDocuments();
   // res.render('user/user', { userName, nombres, apellidos, profile, numComments });
   
   res.render('user/user', { 
      userName,
      admin, 
      cedula, nombres, apellidos, profile, edad, genero, email, 
      numComments 
   });
}

notesControllers.renderIndex = async (req, res) => {
   const userName = req.user.user;
   const { cedula, nombres, apellidos, profile, edad, genero, email } = req.user;
   // console.log(userName);
   const listNotas = await Notas.find({userid: req.user.id}).lean();
   const numComments = await Comments.find({usuario: userName}).countDocuments();

   res.render('notes/index', { 
      listNotas, 
      userName, 
      cedula, nombres, apellidos, profile, edad, genero, email, 
      numComments 
   });
}

notesControllers.renderNewNotaForm = async (req, res) => {
   const userName = req.user.user;
   const { cedula, nombres, apellidos, profile, edad, genero, email } = req.user;
   // console.log(req.user);
   const userDates = req.user;

   const numComments = await Comments.find({usuario: userName}).countDocuments();

   res.render('notes/newNota', {
      userDates,
      userName,
      cedula, nombres, apellidos, profile, edad, genero, email,
      numComments
   });
}

notesControllers.renderNewNota = async (req, res) => {

   const errorsFind = [];
      
   const { 
      titulo, descripcion 
   } = req.body;

   if (titulo.trim() === '' || descripcion.trim() === '') {
      errorsFind.push({info: 'primary', title: 'IMPORTANT', text: 'Los campos no pueden ir vacíos...'})
   }

   var tituloN = titulo.trim();
   var descripcionN = descripcion.trim();

   if (errorsFind.length > 0) {
      const userName = req.user.user;
      const { nombres, apellidos, profile } = req.user;
      const userDates = req.user;
      const numComments = await Comments.find({usuario: userName}).count();

      res.render('notes/newNota', {
         userDates,
         userName,
         nombres, apellidos, profile,
         numComments,
         errorsFind,
         tituloN, descripcionN
      })
   } else {

      const newNota = new Notas({
         titulo: tituloN, 
         descripcion: descripcionN
      });
      newNota.userid = req.user.id;
      await newNota.save();
      req.flash('success_msg', 'Nota agregada con exito...');
      res.redirect('/notes');
   }
}

notesControllers.renderEditNota = async (req, res) => {
   const noteEdit = await Notas.findById(req.params.id).lean();
   // console.log(noteEdit);
   if (noteEdit.userid != req.user.id) {
      req.flash('warning_msg', 'Esta nota no te pertenece. No posees autorización...');
      return res.redirect('/notes');
   }

   res.render('notes/editNota', { noteEdit });
}

notesControllers.renderUpdateNote = async (req, res) => {
   // console.log(req.body);
   const { 
      titulo, descripcion 
   } = req.body;

   var tituloN = titulo.trim();
   var descripcionN = descripcion.trim();

   await Notas.findByIdAndUpdate(req.params.id, {
      titulo: tituloN, 
      descripcion: descripcionN
   });
   req.flash('success_msg', 'Nota modificada con exito...');
   res.redirect('/notes');
}

notesControllers.renderDeleteNote = async (req, res) => {
   await Notas.findByIdAndDelete(req.params.id);
   req.flash('error_msg', 'Nota eliminada con exito...');
   res.redirect('/notes');
}

module.exports = notesControllers;