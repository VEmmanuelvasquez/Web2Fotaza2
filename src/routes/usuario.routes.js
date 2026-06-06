const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuario.controller');

router.get(
    '/:id',
    usuarioController.perfil
);

module.exports = router;