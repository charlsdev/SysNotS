const { Router } = require('express');
const router = Router();

const { 
   renderProfile,
   renderIndex, 
   renderNewNotaForm, 
   renderNewNota, 
   renderEditNota, 
   renderUpdateNote, 
   renderDeleteNote 
} = require('../controllers/notes.controllers');

const { isAuthenticated, isUserAuth } = require('../helpers/keysRouter');

router.get('/user', isAuthenticated, renderProfile);

// Listar todas las notas
router.get('/notes', isAuthenticated, isUserAuth, renderIndex);

// Nueva nota
router.get('/notes/newNotes', isAuthenticated, isUserAuth, renderNewNotaForm);
router.post('/notes/newNotes', isAuthenticated, isUserAuth, renderNewNota);

// Editar nota
router.get('/notes/editNotes/:id', isAuthenticated, isUserAuth, renderEditNota);
router.put('/notes/editNotes/:id', isAuthenticated, isUserAuth, renderUpdateNote);

// Eliminar nota
router.delete('/notes/deleteNotes/:id', isAuthenticated, isUserAuth, renderDeleteNote);

module.exports = router;