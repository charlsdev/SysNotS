const userControllers = {}

const passport = require('passport');

const Usuarios = require('../models/User');

userControllers.renderRegisterForm = (req, res) => {
   res.render('user/register');
}

userControllers.renderRegisterNew = async (req, res) => {
   // console.log(req.body);
   // res.send('User Registrado');
   const errors = [];
   const { 
      cedula, apellidos, nombres, edad, sexo, email, profile, user, password, conf_password
   } = req.body;

   let privilegio = 'Usuario';

   if (password != conf_password) {
      errors.push({text: 'Las contraseñas no coinciden...'})
   }
   if (errors.length > 0) {
      res.render('user/register', {
         errors,
         cedula, apellidos, nombres, edad, sexo, email, user
      })
   } else {
      // res.send('User Registrado');
      const CedulaUser = await Usuarios.findOne({cedula: cedula});
      // console.log(CedulaUser);
      if (CedulaUser) {
         req.flash('error_msg', 'La cedula del usuario ya esta en uso...');
         res.redirect('/register');
      } else {
         const UserLog = await Usuarios.findOne({user: user});
         if (UserLog) {
            errors.push({text: 'El usuario ya esta en uso...'});
            res.render('user/register', {
               errors,
               cedula, apellidos, nombres, edad, sexo, email, user
            })
         } else {
            const newUser = new Usuarios({
               cedula: cedula, apellidos: apellidos, nombres: nombres, edad: edad, genero: sexo, email: email, profile: profile, privilegio: privilegio, user: user, password: password
            });
            console.log(newUser);
            
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg', 'Usuario registrado con exito...');
            res.redirect('/login');
         }
      }
      
   }
}

userControllers.renderLoginForm = (req, res) => {
   res.render('login');
}

userControllers.renderLogin = passport.authenticate('local.login', {
   failureRedirect: '/login',
   successRedirect: '/user',
   failureFlash: true
});

userControllers.renderLogout = (req, res) => {
   req.logout();
   req.flash('warning_msg', 'Sesión cerrada. Vuelva pronto...');
   res.redirect('/login');
}

module.exports = userControllers;