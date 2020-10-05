const adminControllers = {}

const Comments = require('../models/Comment');
const Usuarios = require('../models/User');

adminControllers.renderRegisterFormAdmin = async (req, res) => {
   const userName = req.user.user;
   const { cedula, nombres, apellidos, profile, edad, genero, email } = req.user;

   const rolSys = req.user.privilegio;
   let admin = (rolSys == 'Admin');

   const numComments = await Comments.find({usuario: userName}).countDocuments();

   res.render('admin/index', { 
      userName,
      admin, 
      cedula, nombres, apellidos, profile, edad, genero, email, 
      numComments 
   });
}

adminControllers.renderRegisterNewAdmin = async (req, res) => {
   const userName = req.user.user;
   const { cedula, nombres, apellidos, profile, edad, genero, email } = req.user;

   const rolSys = req.user.privilegio;
   let admin = (rolSys == 'Admin');

   const numComments = await Comments.find({usuario: userName}).countDocuments();

   const errors = [];
   const { 
      cedulaAd, apellidosAd, nombresAd, edadAd, sexoAd, emailAd, profileAd, privilegioAd, userAd, passwordAd, conf_passwordAd
   } = req.body;

   if (passwordAd != conf_passwordAd) {
      errors.push({text: 'Las contraseñas no coinciden...'})
   }
   if (errors.length > 0) {
      res.render('admin/index', {
         userName,
         admin, 
         cedula, nombres, apellidos, profile, edad, genero, email, 
         numComments,
         errors,
         cedulaAd, apellidosAd, nombresAd, edadAd, emailAd, userAd
      })
   } else {
      const CedulaUser = await Usuarios.findOne({cedula: cedulaAd});
      if (CedulaUser) {
         req.flash('error_msg', 'La cedula ya esta en uso...');
         res.redirect('/newAdmin');
      } else {
         const UserLog = await Usuarios.findOne({user: userAd});
         if (UserLog) {
            errors.push({text: 'El nombre de usuario ya esta en uso...'});
            res.render('admin/index', {
               userName,
               admin, 
               cedula, nombres, apellidos, profile, edad, genero, email, 
               numComments,
               errors,
               cedulaAd, apellidosAd, nombresAd, edadAd, emailAd, userAd
            })
         } else {
            const newUser = new Usuarios({
               cedula: cedulaAd, apellidos: apellidosAd, nombres: nombresAd, edad: edadAd, genero: sexoAd, email: emailAd, profile: profileAd, privilegio: privilegioAd, user: userAd, password: passwordAd
            });
            console.log(newUser);
            newUser.password = await newUser.encryptPassword(passwordAd);
            await newUser.save();
            req.flash('success_msg', 'Registro guardado con éxito...');
            res.redirect('/user');
         }
      }
      
   }
}

module.exports = adminControllers;