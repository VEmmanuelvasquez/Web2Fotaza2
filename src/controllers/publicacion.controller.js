const Publicacion = require('../models/Publicacion');

exports.feed = async (req, res) => {

    const publicaciones = await Publicacion.findAll({

        order: [['id', 'DESC']]

    });

    res.render('feed/index', {

        publicaciones,

        usuario: req.session.usuario

    });

};

exports.formCrear = (req, res) => {

    if (!req.session.usuario) {
        return res.redirect('/auth/login');
    }

    res.render('feed/crear');
};



exports.crear = async (req, res) => {

    try {

        await Publicacion.create({

            titulo: req.body.titulo,

            descripcion: req.body.descripcion,

            imagen: req.file ? req.file.filename : null,

            usuarioId: req.session.usuario ? req.session.usuario.id : null

        });

        res.redirect('/feed');

    } catch (error) {

        console.log(error);

        res.send('Error al publicar');

    }

};