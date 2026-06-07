const express = require('express');
const router = express.Router();

const interesController = require('../controllers/interes.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post(
    '/crear/:id',
    authMiddleware.isAuth,
    interesController.crear
);

module.exports = router;