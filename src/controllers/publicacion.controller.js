const Publicacion = require('../models/Publicacion');
const Usuario = require('../models/Usuario');
const {Op, where} = require('sequelize');
const  Comentario = require('../models/Comentario');
const Valoracion = require('../models/Valoracion');
const Seguimiento = require('../models/Seguimiento');
const Coleccion = require('../models/Coleccion');

exports.feed = async (req, res) => {
    const busqueda = req.query.q || '';
    const publicaciones = await Publicacion.findAll({

        include: [
            Usuario,
            {
                model: Comentario,
                include:[Usuario]
            },

            {
                model: Valoracion
            }
        ],

        where: {
    titulo: {
        [Op.iLike]: `%${busqueda}%`
    }
},

        order: [['id', 'DESC']]

    });

    const usuarios = await Usuario.findAll();

    const seguimientos = await Seguimiento.findAll({
       where: {
        seguidorId: req.session.usuario.id
       }

    });

    const siguiendo = seguimientos.map(s => s.seguidoId);

    const  cantidadSiguiendo = siguiendo.length;

    const cantidadSeguidores = await Seguimiento.count({
        where:{
            seguidoId:req.session.usuario.id
        }
    });

    publicaciones.forEach(publicacion => {

    const cantidadVotos = publicacion.Valoracions.length;

    const suma = publicacion.Valoracions.reduce(
        (acc, valoracion) => acc + valoracion.puntaje,
        0
    );

    publicacion.promedio =
        cantidadVotos > 0
            ? (suma / cantidadVotos).toFixed(1)
            : 0;

    publicacion.cantidadVotos = cantidadVotos;

});

   const colecciones = await Coleccion.findAll({

    where: {
        usuarioId: req.session.usuario.id
    }
   });

    res.render('feed/index', {

        publicaciones,
        usuarios,
        siguiendo,
        cantidadSiguiendo,
        cantidadSeguidores,
        usuario: req.session.usuario,
        colecciones

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

    exports.eliminar = async (req, res) => {

        
        try{
            const publicacion = await Publicacion.findByPk(
                req.params.id
            );
            console.log('usuarioId publicación:', publicacion.usuarioId);
            console.log('usuario sesión:', req.session.usuario.id);

            if (!publicacion) {
                return res.send('Publicacion no encontrada ');
            }

            if(
                publicacion.usuarioId !==
                req.session.usuario.id
            ){
                return res.send(' no autorizado');
            }

            await publicacion.destroy();

            res.redirect('/feed');
        } catch (error) {
            console.log(error);
            res.send('Error al eliminar');
        }

    };
    
    exports.formEditar = async (req, res) => {

    const publicacion = await Publicacion.findByPk(
        req.params.id
    );

    if (!publicacion) {
        return res.send('Publicacion no encontrada');
    }

    if (
        publicacion.usuarioId !==
        req.session.usuario.id
    ) {
        return res.send('No autorizado');
    }

    res.render('feed/editar', {
        publicacion
    });

};

exports.editar = async (req, res) => {

    try {

        const publicacion =
           await Publicacion.findByPk(req.params.id);

        if(!publicacion) {
            return res.send('Publicacion no encontrada');

        }

        if(
            publicacion.usuarioId !==
            req.session.usuario.id
        ) {
            return res.send('No autorizado');

        }

        publicacion.titulo =
        req.body.titulo;



        publicacion.descripcion =
            req.body.descripcion;

        if (req.file) {
            publicacion.imagen =
              req.file.filename;

        await Valoracion.destroy({
            where: {
                publicacionId: publicacion.id
            }
        });
        }
        
        await publicacion.save();

        res.redirect('/feed');

    } catch (error) {

        console.log(error);

        res.send('Error al editar')
    }
};

exports.feedSiguiendo = async (req, res) => {

    const seguimientos = await Seguimiento.findAll({
        where: {
            seguidorId: req.session.usuario.id
        }
    });

    const siguiendo = seguimientos.map(
        s => s.seguidoId
    );

    const publicaciones = await Publicacion.findAll({

        where: {
            usuarioId: {
                [Op.in]: siguiendo
            }
        },

        include: [
            Usuario,
            {
                model: Comentario,
                include: [Usuario]
            },
            {
                model:Valoracion
            }
        ],

        order:[['id', 'DESC']]
    });

    publicaciones.forEach(publicacion => {

        const cantidadVotos = publicacion.Valoracions.length;

        const suma =
           publicacion.Valoracions.reduce(
            (acc, valoracion) =>
                acc + valoracion.puntaje,
            0
           );

        publicacion.promedio = cantidadVotos > 0 ? (suma / cantidadVotos).toFixed(1): 0;

        publicacion.cantidadVotos = cantidadVotos;

    });

    res.render('feed/siguiendo', {
        publicaciones,
        usuario: req.session.usuario
    });
};