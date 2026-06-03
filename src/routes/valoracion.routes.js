const express = require('express');
const router = express.Router();

const ValoracionController = require('../controllers/valoracion.controllers');
const { isAuth } = require('../middlewares/auth.middleware');

router.post(
    '/crear/:id',
    isAuth,
    ValoracionController.crear
);

module.exports = router;