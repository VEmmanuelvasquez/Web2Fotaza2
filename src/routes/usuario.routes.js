const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuario.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get(
  '/perfil',
  authMiddleware.isAuth,
  usuarioController.perfil
);


module.exports = router;