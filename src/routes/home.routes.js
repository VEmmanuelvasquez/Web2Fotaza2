const express = require('express');
const router = express.Router();

const Publicacion = require('../models/Publicacion');

router.get('/', async (req, res) => {

    const publicaciones = await Publicacion.findAll({
        order: [['id', 'DESC']]
    });

    res.render('index', {
        usuario: req.session.usuario,
        publicaciones
    });

});

module.exports = router;