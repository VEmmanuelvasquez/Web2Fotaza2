const Valoracion = require('../models/Valoracion');
const Publicacion = require('../models/Publicacion');

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

        await Valoracion.create({
            puntaje: req.body.puntaje,
            usuarioId: req.session.usuario.id,
            publicacionId: req.params.id
        });

        res.redirect('/feed');

    } catch (error) {

        console.log(error);
        res.send('Error al valorar');
    }
}