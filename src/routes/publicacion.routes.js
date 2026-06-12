const express = require('express');
const router = express.Router();
const publicacionController = require('../controllers/publicacion.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const upload = require('../config/multers');
const { isAuth } = require('../middlewares/auth.middleware');

router.get('/', publicacionController.feed);

router.get('/crear',
    authMiddleware.isAuth,
    publicacionController.formCrear
);

router.post('/crear',
    authMiddleware.isAuth,
    upload.array('imagenes',10),
    publicacionController.crear
);

router.post(
    '/toggle-comentarios/:id',
    isAuth,
    publicacionController.toggleComentarios
);

router.get(
    '/siguiendo',
    isAuth,
    publicacionController.feedSiguiendo
);

module.exports = router;
