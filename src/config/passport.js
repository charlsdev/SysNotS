const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const User = require('../models/User');

passport.use('local.login', new localStrategy({
   usernameField: 'username',
   passwordField: 'password',
   passReqToCallback: true,
   // session: false
}, async (req, username, password, done) => {

   console.table({ username, password })

   // Confirmar si coincide el username
   const user = await User.findOne({user: username});

   console.log(user);

   if (!user) {
      return done(null, false, { message: 'Usuario y/o contraseña no existentes...'});
   } else {
      // Validar la contraseña
      const passLog = await user.matchPassword(password);
      if (passLog) {
         // console.log(user);
         return done(null, user);
      } else {
         return done(null, false, { message: 'Usuario y/o contraseña incorrecta...'});
      }
   }
}));

passport.serializeUser((user, done) => {
   // console.log(user);
   done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
   try {
      const user = await User.findById(id).exec();
      done(null, user);
   } catch (err) {
      done(err, null);
   }
});