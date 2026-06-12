const Coleccion = require('../models/Coleccion');
const Publicacion = require('../models/Publicacion');
const Usuario = require('../models/Usuario');

exports.formCrear = (req, res) => {
    res.render('coleccion/crear');
};

exports.crear = async ( req, res) => {
    await Coleccion.create({
        nombre: req.body.nombre,
        usuarioId: req.session.usuario.id
    });
    
    res.redirect('/colecciones');
};

exports.listar = async (req, res) => {
    const colecciones = await Coleccion.findAll({
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

    res.render('coleccion/coleccion', {
        colecciones
    });
};