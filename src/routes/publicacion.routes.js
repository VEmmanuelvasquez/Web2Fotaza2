const expres = require('express');
const router = expres.Router();
const PublicacionController = require('../controllers/publicacion.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const upload = require('../config/multer');

router.get('/',
    PublicacionController.feed
);

router.post('/crear',
    authMiddleware.isAuth,
    upload.single('imagen'),
    PublicacionController.crear
);

module.exports = router;