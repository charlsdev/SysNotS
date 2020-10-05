require('dotenv').config();

const app = require('./server');

//Requiero el modulo de coneccion de la DB
require('./database');

//Empezamos el servidor
app.listen(app.get('port'), () => {
   // console.log(`Server on port ${app.get('port')}`);
   console.log('Server on port ' + app.get('port'));
});