const { Router } = require('express');
const router = Router();

const { 
   render404
} = require('../controllers/404.controllers');

router.get('/', render404);

module.exports = router;