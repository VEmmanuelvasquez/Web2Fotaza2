const express = require('express');
const router = express.Router();

const denunciaController = require('../controllers/denuncia.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post(
    '/crear/:id',
    authMiddleware.isAuth,
    denunciaController.crear
);

module.exports = router;