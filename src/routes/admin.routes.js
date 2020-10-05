const { Router } = require('express');
const router = Router();

const {
   renderRegisterFormAdmin,
   renderRegisterNewAdmin
} = require('../controllers/admin.controllers');

const { 
   isAuthenticated, 
   isNotAuthenticated, 
   isAdminAuth 
} = require('../helpers/keysRouter');

router.get('/newAdmin', isAuthenticated, isAdminAuth, renderRegisterFormAdmin);
router.post('/registerProfileAdmin', isAuthenticated, isAdminAuth, renderRegisterNewAdmin);

module.exports = router;