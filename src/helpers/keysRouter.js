const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
   if (req.isAuthenticated()) {
      return next();
   }
   req.flash('info_msg', 'No estas autorizado. Inicia sesión...');
   res.redirect('/login');
}

helpers.isNotAuthenticated = (req, res, next) => {
   if (!req.isAuthenticated()) {
      return next();
   }
   res.redirect('/user');
}

helpers.isUserAuth = (req, res, next) => {
   if (req.user.privilegio == 'Usuario') {
      return next();
   }
   res.redirect('/login');
}

helpers.isAdminAuth = (req, res, next) => {
   if (req.user.privilegio == 'Admin') {
      return next();
   }
   res.redirect('/login');
}

module.exports = helpers;