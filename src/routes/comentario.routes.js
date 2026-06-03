const express = require('express');
const router = express.Router();

const comentarioController = require('../controllers/comentario.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post(
    '/crear/:id',
    authMiddleware.isAuth,
    comentarioController.crear
);

module.exports = router;