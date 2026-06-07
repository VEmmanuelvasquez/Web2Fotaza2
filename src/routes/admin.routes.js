const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin.controller');
const { isAdmin } = require('../middlewares/auth.middleware');

router.get(
    '/',
    
    isAdmin,
    adminController.panel
);

router.post(
    '/estado/:id',
    isAdmin,
    adminController.cambiarEstado
);

module.exports = router;