const Valoracion = require('../models/Valoracion');
const Publicacion = require('../models/Publicacion');
const Notificacion = require('../models/Notificacion');

exports.crear = async (req, res) => {

    try {
        const publicacion = await Publicacion.findByPk(
            req.params.id
        );

        if (!publicacion) {
            return res.send('Publicacion no encontrada');

        }

        if (
            publicacion.usuarioId ===
            req.session.usuario.id
        ) {
            return res.send('No puedes valorar tu propia publicacion');

        }

        const existe = await Valoracion.findOne({
            where: {
                usuarioId: req.session.usuario.id,
                publicacionId: req.params.id
            }
        });

        if (existe) {
            return res.send('Ya valoraste esta publiacion');
        }

        await Valoracion.create({
            puntaje: req.body.puntaje,
            usuarioId: req.session.usuario.id,
            publicacionId: req.params.id
        });

        await Notificacion.create({
            tipo: 'valoracion',
            usuarioDestinoId: publicacion.usuarioId,
            usuarioEmisorId: req.session.usuario.id
        });
        
        res.redirect('/feed');

    } catch (error) {

        console.log(error);
        res.send('Error al valorar');
    }
}