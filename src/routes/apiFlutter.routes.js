const { Router } = require('express');
const router = Router();

const { 
   renderNotesAPI,
   renderUsersAPI
} = require('../controllers/apiFlutter.controllers');

// Listar Notas API
router.get('/notesAPI', renderNotesAPI);

// Listar Users API
// -* IMG : src="/upload/{{profile}}" *-
router.get('/usersAPI', renderUsersAPI);

module.exports = router;