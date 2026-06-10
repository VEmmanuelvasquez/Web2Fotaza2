const express = require('express');
const router = express.Router();
const publicacionController = require('../controllers/publicacion.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const upload = require('../config/multers');
const { isAuth } = require('../middlewares/auth.middleware');


router.get('/',

    publicacionController.feed
);

router.get('/crear',
    authMiddleware.isAuth,
    publicacionController.formCrear

)

router.post('/crear',
    authMiddleware.isAuth,
    upload.single('imagen'),
    publicacionController.crear
);
router.post(
    '/eliminar/:id',
    authMiddleware.isAuth,
    publicacionController.eliminar
)

router.get(
    '/editar/:id',
    isAuth,
    publicacionController.formEditar
);

router.post(
    '/editar/:id',
    isAuth,
    upload.single('imagen'),
    publicacionController.editar

);

router.get(
    '/siguiendo',
    isAuth,
    publicacionController.feedSiguiendo
);

router.post(
    '/toggle-comentarios/:id',
    isAuth,
    publicacionController.toggleComentarios
);

module.exports = router;