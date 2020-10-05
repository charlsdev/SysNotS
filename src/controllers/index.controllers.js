const indexControllers = {}

const Laboratorios = require('../models/Laboratorios');

indexControllers.renderIndex = (req, res) => {
   res.render('index');
}

indexControllers.renderTeam = (req, res) => {
   res.render('team');
}

// indexControllers.renderLogin = (req, res) => {
//    res.render('login');
// }

indexControllers.renderLaboratorios = async (req, res) => {
   // const listLab = await Laboratorios.find().lean();
   const listLab = await Laboratorios.find().lean();
   // console.log(listLab);
   res.render('laboratorios', { listLab });
}

// Procesos de la BD
indexControllers.renderNewLabForm = (req, res) => {
   res.render('newlab');
}

indexControllers.renderNewLab = async (req, res) => {
   // console.log(req.body);
   // res.send(req.body);
   const { 
      cedula, apename, edad, sexo, direccion, email, telefono, nameLab, direccionLab, telefonoLab 
   } = req.body;
      
      // Poner las variables del formulario tal y como estan en la BD  
      // o si quieres cambiar las variables debes de llamar la de la siguiente manera
      // cedula ==> DB y cedulaUser ==>Fomulario 
      // /** Se llama de la siguiente manera**/ ===> cedula: cedulaUser,
   const newLab = new Laboratorios({
      cedula, apename, edad, sexo, direccion, email, telefono, nameLab, direccionLab, telefonoLab
   })
   // console.log(newLab);
   await newLab.save();
   req.flash('success_msg', 'Laboratorio agregado con exito...');
   res.redirect('/laboratorios');
}

indexControllers.renderEditLab = async (req, res) => {
   const noteEdit = await Laboratorios.findById(req.params.id).lean();
   // console.log(noteEdit);
   res.render('editLab', { noteEdit });
}

indexControllers.renderUpdateLab = async (req, res) => {
   // console.log(req.body);
   const { 
      cedula, apename, edad, sexo, direccion, email, telefono, nameLab, direccionLab, telefonoLab 
   } = req.body;
   await Laboratorios.findByIdAndUpdate(req.params.id, {
      cedula, apename, edad, sexo, direccion, email, telefono, nameLab, direccionLab, telefonoLab
   });
   req.flash('success_msg', 'Laboratorio modificado con éxito...');
   res.redirect('/laboratorios');
}

indexControllers.renderDeleteLab = async (req, res) => {
   await Laboratorios.findByIdAndDelete(req.params.id);
   req.flash('success_msg', 'Laboratorio eliminado con éxito...');
   res.redirect('/laboratorios');
}

//404
indexControllers.render404 = (req, res) => {
   res.render('404');
}

module.exports = indexControllers;