const express = require('express');
const router = express.Router();

const seguimientoController =
require('../controllers/seguimiento.controller');

const { isAuth } =
require('../middlewares/auth.middleware');

router.post(
    '/seguir/:id',
    isAuth,
    seguimientoController.seguir
);

router.post(
    '/dejar-seguir/:id',
    isAuth,
    seguimientoController.dejarSeguir
);

module.exports = router;