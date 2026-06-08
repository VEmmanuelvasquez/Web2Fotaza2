const ColeccionPublicacion = require('../models/ColeccionPublicacion');

exports.agregar = async (req, res) => {
    try{
    const existe = await ColeccionPublicacion.findOne({
        where: {
            coleccionId: req.body.coleccionId,
            publicacionId: req.params.id
        }
    });

    if (existe) {
        return res.send('La publicacion ya esta en esta coleccion');

    }
    await ColeccionPublicacion.create({
        coleccionId: req.body.coleccionId,
        publicacionId: req.params.id
    });

    res.redirect('/colecciones');
} catch ( error) {
    console.error(error);
    res.send(error.message);
}
};