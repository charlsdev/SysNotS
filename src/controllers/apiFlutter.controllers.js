const flutterControllers = {}

const Notas = require('../models/Notas');
const User = require('../models/User');

// Listar Notas API
flutterControllers.renderNotesAPI = async (req, res) => {
   const listNotasAPI = await Notas.find().lean();
   res.json({ notes: listNotasAPI });
}

// Listar Usuarios API
flutterControllers.renderUsersAPI = async (req, res) => {
   const listUsersAPI = await User.find().lean().sort({createdAt: 'desc'});
   res.json({ users: listUsersAPI });
}

module.exports = flutterControllers;