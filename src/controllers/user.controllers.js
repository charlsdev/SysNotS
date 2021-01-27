const userControllers = {}
require('dotenv').config();

const passport = require('passport');
const nodemailer = require('nodemailer');

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

            // Enviar correos electronicos a los usuarios
            // contentHTML = `
            //    <h1>Register Succesfull</h1>
            //    <ul>
            //       <li>Username: ${user}</li>
            //       <li>Password: ${password}</li>
            //    </ul>
            //    <p>Estas son sus credenciales para iniciar sesion a la plataforma, disfrutela al máximo y exitos...</p>
            // `;

            // const transporte = nodemailer.createTransport({
            //    host: "mail.privateemail.com",
            //    port: 587,
            //    secure: false,
            //    auth: {
            //       user: `${process.env.userMail}`,
            //       pass: `${process.env.passMail}`
            //    },
            //    // // TLS es para cualquier lugar enviar correos
            //    // tls: {
            //    //    // Indicamos que se enviara desde LOCALHOST
            //    //    rejectUnauthorized: false
            //    // }
            // });

            // const info = await transporte.sendMail({
            //    from: `'CharlsDeV Server' <${process.env.userMail}>`,
            //    // from: "'CharlsDeV Server' <charlsdev2309@innovatechs.xyz>",
            //    to: 'youquince@gmail.com',
            //    subject: 'Registro exitoso',
            //    // text: "Hola mundo"
            //    html: contentHTML
            // });

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