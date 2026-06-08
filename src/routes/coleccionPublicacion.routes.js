const express = require('express');
const router = express.Router();

const controller = require('../controllers/coleccionPublicacion.controller');

const auth = require('../middlewares/auth.middleware');

router.post(
    '/agregar/:id',
    auth.isAuth,
    controller.agregar
);

module.exports = router;