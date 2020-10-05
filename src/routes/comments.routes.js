const { Router } = require('express');
const router = Router();

const { 
   renderComments,
   renderCommentsNew,
   renderProfilePhoto
} = require('../controllers/comments.controllers');

const { isAuthenticated } = require('../helpers/keysRouter');

router.get('/comments', renderComments);

router.post('/commentsNew', isAuthenticated, renderCommentsNew);

// Imagen de perfil
router.post('/profilePhoto', isAuthenticated, renderProfilePhoto);

module.exports = router;