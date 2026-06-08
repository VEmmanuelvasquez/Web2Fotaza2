const express = require('express');
const router = express.Router();

const controller = require('../controllers/coleccion.controller');
const auth = require('../middlewares/auth.middleware');

router.get(
    '/', 
    auth.isAuth,
    controller.listar
);

router.get(
    '/crear',
     auth.isAuth,
     controller.formCrear
    );

router.post(
    '/crear',
     auth.isAuth,
     controller.crear
    );

module.exports = router;
