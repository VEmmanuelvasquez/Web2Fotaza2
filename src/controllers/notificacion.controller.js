const Notificacion = require('../models/Notificacion');
const Usuario = require('../models/Usuario');

exports.listar = async (req, res) => {

    const notificaciones = await Notificacion.findAll({

        where: {
            usuarioDestinoId:
               req.session.usuario.id
        },

        include: [
            {
                model: Usuario,
                as: 'Emisor'
            }
        ],

        order: [['createdAt', 'DESC']]
    });

    res.render('notificacion/notificacion', { notificaciones });

};

exports.leer = async (req, res) => {

    const notificacion = await Notificacion.findByPk(
    req.params.id
);

    if (notificacion) {
        notificacion.leida = true;
        await notificacion.save();
    }
    res.redirect('/notificaciones');
};