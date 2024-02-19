const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const multer = require('multer');
const cors = require('cors');
// const { check, validationResult } = require('express-validator');

//Inicializaciones
const app = express();
require('./config/passport');

//Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
   extname: '.hbs',
   layoutsDir: path.join(app.get('views'), 'layouts'),
   partialsDir: path.join(app.get('views'), 'partials'),
   helpers: require('./helpers/timeagoFormat'),
   defaultLayout: 'main'
}))
app.set('view engine', '.hbs');

//Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(multer({
   dest: path.join(__dirname, 'public/upload/temp')
}).single('profilePhoto'));
app.use(express.json());                           //Interpreta los JSON que lleguen a mi aplicación
app.use(express.urlencoded({extended: false}));    //Para poder interpretar los datos de los form
app.use(methodOverride('_method'));
app.use(session({
   secret: 'secret',
   resave: true,
   saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Variables globales
app.use((req, res, next) => {
   res.locals.success_msg = req.flash('success_msg');
   res.locals.error_msg = req.flash('error_msg');
   res.locals.warning_msg = req.flash('warning_msg');
   res.locals.info_msg = req.flash('info_msg');
   res.locals.error = req.flash('error');
   res.locals.user = req.user || null;
   next();
});

//Rutas
app.use(require('./routes/index.routes'));
app.use(require('./routes/notes.routes'));
app.use(require('./routes/user.routes'));
app.use(require('./routes/comments.routes'));
app.use(require('./routes/admin.routes'));
// app.use(require('./routes/apiFlutter.routes')); // Rutas API
// app.use(require('./routes/404.routes'));

//Archivos estáticos
app.use(express.static(path.join(__dirname + '/public')));
// app.use("/static", express.static(path.join(__dirname + '/public')));

module.exports = app;