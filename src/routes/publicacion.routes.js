const express = require('express');
const router = express.Router();
const publicacionController = require('../controllers/publicacion.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const upload = require('../config/multers');

router.get('/',

    publicacionController.feed
);

router.get('/crear',
    authMiddleware.isAuth,
    publicacionController.formCrear

)

router.post('/crear',
    authMiddleware.isAuth,
    upload.single('imagen'),
    publicacionController.crear
);

module.exports = router;