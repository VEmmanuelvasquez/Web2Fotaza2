const express = require('express');
const router = express.Router();

const favoritoController = require('../controllers/favorito.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/guardar/:id', authMiddleware.isAuth, favoritoController.guardar);
router.get('/',authMiddleware.isAuth,favoritoController.listar);

module.exports = router;
