const mongoose = require('mongoose');

//Traemos nuestra variable de entorno
const mongoDB = process.env.mongoDB;
// Conexion a la DB con ES6, con el puerto y la nombre de la BD
// const { hostBD, nameDB } = process.env;
// const mongoDB = `mongodb://${hostBD}/${nameDB}`;
//console.log(mongoDB)

mongoose.connect(mongoDB, {
   useUnifiedTopology: true,
   useNewUrlParser: true
})
   .then((db) => console.log(`DB is connect to ${db.connection.host}...`))
   .catch((err) => console.log(err));