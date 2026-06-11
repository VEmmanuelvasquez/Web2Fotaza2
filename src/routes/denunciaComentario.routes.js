const express = require('express');
const router = express.Router();

const controller =
require('../controllers/denunciaComentario.controller');

const authMiddleware =
require('../middlewares/auth.middleware');
const DenunciaComentario = require('../models/DenunciaComentario');

router.post(
    '/crear/:id',
    authMiddleware.isAuth,
    controller.crear
);

router.get(
    '/',
    authMiddleware.isAuth,
    controller.listar
);

router.post(
    '/eliminar-comentario/:id',
    authMiddleware.isAuth,
    controller.eliminarComentario
);
module.exports = router;