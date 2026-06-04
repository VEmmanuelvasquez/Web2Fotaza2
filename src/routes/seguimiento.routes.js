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

module.exports = router;