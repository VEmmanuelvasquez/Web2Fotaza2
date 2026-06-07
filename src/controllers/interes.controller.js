const Interes = require('../models/Interes');
const Publicacion = require('../models/Publicacion');
const Notificacion = require('../models/Notificacion');

exports.crear = async (req, res) => {

    try {
        const publicacion = await Publicacion.findByPk(req.params.id);

        if (!publicacion) {
            return res.send('Publicacion no encontrada');
        }

        if (
            publicacion.usuarioId === req.session.usuario.id
        ) {
            return res.send('No puedes interesarte en tu propia publicacion');
        }

        const existe = await Interes.findOne({

            where: {
                usuarioId: req.session.usuario.id,
                publicacionId: req.params.id
            }
        });

        if (existe) {
            return res.send('Ya marcaste interes en esta publicacion');

        }

        await Interes.create({
            usuarioId: req.session.usuario.id,
            publicacionId: req.params.id
        });

        await Notificacion.create({
            tipo: 'interes',
            usuarioDestinoId: publicacion.usuarioId,
            usuarioEmisorId: req.session.usuario.id
        });
        res.redirect('/feed');

    } catch (error) {
        console.log(error);
        res.send('Error al registrar interes');

    }
};