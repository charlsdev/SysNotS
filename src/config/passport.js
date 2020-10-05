const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const User = require('../models/User');

passport.use('local.login', new localStrategy({
   usernameField: 'username',
   passwordField: 'password',
   passReqToCallback: true,
   // session: false
}, async (req, username, password, done) => {

   // Confirmar si coincide el username
   const user = await User.findOne({user: username});
   if (!user) {
      return done(null, false, { message: 'Usuario no existente...'});
   } else {
      // Validar la contraseña
      const passLog = await user.matchPassword(password);
      if (passLog) {
         // console.log(user);
         return done(null, user);
      } else {
         return done(null, false, { message: 'Contraseña incorrecta...'});
      }
   }
}));

passport.serializeUser((user, done) => {
   // console.log(user);
   done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
   await User.findById(id, (err, user) => {
      // console.log(user.nombres);
      done(err, user);
   })
});