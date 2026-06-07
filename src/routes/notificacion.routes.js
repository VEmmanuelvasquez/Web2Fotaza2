const express = require('express');
const router = express.Router();

const controller = require('../controllers/notificacion.controller');

const { isAuth } = require('../middlewares/auth.middleware');

router.get(
    '/',
    isAuth,
    controller.listar

);

router.post(
    '/leer/:id',
    isAuth,
    controller.leer
);

module.exports = router;