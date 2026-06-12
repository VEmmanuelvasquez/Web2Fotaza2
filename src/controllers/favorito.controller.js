const Favorito = require('../models/Favorito');
const Publicacion = require('../models/Publicacion');
const Usuario = require('../models/Usuario');

exports.guardar = async (req, res) => {
    const publicacion = await Publicacion.findByPk(
    req.params.id
);

if (
    publicacion.usuarioId === req.session.usuario.id
);

if ( publicacion.usuarioId === req.session.usuario.id) {
    return res.send('No puedes guardar tu propia publicacion en favoritos');

}
    const existe = await Favorito.findOne({
        where: {
            usuarioId: req.session.usuario.id,
            publicacionId: req.params.id
        }
    });

    if (existe) {
        return res.send('Ya esta en favoritos');

    }

    await Favorito.create({
        usuarioId: req.session.usuario.id,
        publicacionId: req.params.id
    });
    
    res.redirect('/feed');
};

exports.listar = async (req, res) => {

    const favoritos = await Favorito.findAll({
        where: {
            usuarioId: req.session.usuario.id
        },

        include: [
            {
                model: Publicacion,
                include: [Usuario]
            }
        ]
    });

    res.render('favorito/favorito', {
        favoritos
    });
};

