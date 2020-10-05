const { Router } = require('express');
const router = Router();

const { 
   renderIndex, 
   renderTeam,
   render404, 
   // renderLogin, 
   renderLaboratorios, 
   renderNewLabForm, 
   renderNewLab, 
   renderEditLab, 
   renderUpdateLab, 
   renderDeleteLab 
} = require('../controllers/index.controllers');

const { isAuthenticated, isAdminAuth } = require('../helpers/keysRouter');

//router.get('/', renderIndex);
router.get('/', render404);

router.get('/team', renderTeam);

// router.get('/login', renderLogin);

// list todos los laboratorios
///router.get('/laboratorios', renderLaboratorios);

// Procesos de la DB
// Añadir nuevo Lab
///router.get('/newLab', renderNewLabForm);

///router.post('/newLab', renderNewLab);

// Editar Lab
///router.get('/editLab/:id', renderEditLab);

///router.put('/editLab/:id', renderUpdateLab);

// Eliminar Lab
///router.delete('/deleteLab/:id', renderDeleteLab);

module.exports = router;