const { Router } = require('express');
const router = Router();

const { 
   renderRegisterForm, 
   renderRegisterNew, 
   renderLoginForm, 
   renderLogin, 
   renderLogout 
} = require('../controllers/user.controllers');

const { isNotAuthenticated } = require('../helpers/keysRouter');

// Usuario register
router.get('/register', renderRegisterForm);
router.post('/register', renderRegisterNew);

// LoginForm, Logueado, Session Close
router.get('/login', isNotAuthenticated, renderLoginForm);
router.post('/user/login', renderLogin);
router.get('/user/logout', renderLogout);

module.exports = router;