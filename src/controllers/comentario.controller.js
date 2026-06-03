const Comentario = require('../models/Comentario');

exports.crear = async (req, res) => {

    try {

        await Comentario.create({

            texto: req.body.texto,
            usuarioId: req.session.usuario.id,
            publicacionId: req.params.id
        });

        res.redirect('/feed');

    } catch (error) {

        console.log(error);
        res.send('Error al comentar');
    }
};