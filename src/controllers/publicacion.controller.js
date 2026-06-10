const Publicacion = require('../models/Publicacion');
const Usuario = require('../models/Usuario');
const { Op } = require('sequelize');
const Comentario = require('../models/Comentario');
const Valoracion = require('../models/Valoracion');
const Seguimiento = require('../models/Seguimiento');
const Coleccion = require('../models/Coleccion');
const Etiqueta = require('../models/Etiqueta');

exports.feed = async (req, res) => {
    const busqueda = req.query.q || '';
    const publicaciones = await Publicacion.findAll({
        include: [
            Usuario,
            {
                model: Comentario,
                include: [Usuario]
            },
            {
                model: Valoracion
            },
            {
                model: Etiqueta
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
    const cantidadSiguiendo = siguiendo.length;

    const cantidadSeguidores = await Seguimiento.count({
        where: {
            seguidoId: req.session.usuario.id
        }
    });

    
    publicaciones.forEach(publicacion => {
        const valoraciones = publicacion.Valoracions || [];
        const cantidadVotos = valoraciones.length;

        const suma = valoraciones.reduce(
            (acc, valoracion) => acc + valoracion.puntaje,
            0
        );

        const promedio = cantidadVotos > 0 ? (suma / cantidadVotos).toFixed(1) : 0;

        publicacion.promedio = promedio;
        publicacion.cantidadVotos = cantidadVotos;

        
        publicacion.score = Number(promedio) + (cantidadVotos * 0.2);
    });

    const colecciones = await Coleccion.findAll({
        where: {
            usuarioId: req.session.usuario.id
        }
    });

    
    const destacadas = publicaciones
        .filter(p => p.cantidadVotos >= 3 && p.promedio >= 3.5) 
        .sort((a, b) => b.score - a.score);

    const normales = publicaciones
        .filter(p => !(p.cantidadVotos >= 3 && p.promedio >= 3.5))
        .sort(() => Math.random() - 0.5);

    const publicacionesHome = [
        ...destacadas,
        ...normales.slice(0, 5) 
    ];

    res.render('feed/index', {
        publicaciones: publicacionesHome,
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
        const publicacion = await Publicacion.create({
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            imagen: req.file ? req.file.filename : null,
            usuarioId: req.session.usuario ? req.session.usuario.id : null
        });

        if (req.body.etiquetas) {
            const etiquetas = req.body.etiquetas.split(',').map(e => e.trim());
            for (const nombre of etiquetas) {
                let etiqueta = await Etiqueta.findOne({ where: { nombre } });
                if (!etiqueta) {
                    etiqueta = await Etiqueta.create({ nombre });
                }
                await publicacion.addEtiqueta(etiqueta);
            }
        }

        res.redirect('/feed');
    } catch (error) {
        console.log(error);
        res.send('Error al publicar');
    }
};

exports.eliminar = async (req, res) => {
    try {
        const publicacion = await Publicacion.findByPk(req.params.id);
        if (!publicacion) {
            return res.send('Publicacion no encontrada');
        }
        if (publicacion.usuarioId !== req.session.usuario.id) {
            return res.send('No autorizado');
        }
        await publicacion.destroy();
        res.redirect('/feed');
    } catch (error) {
        console.log(error);
        res.send('Error al eliminar');
    }
};

exports.formEditar = async (req, res) => {
    const publicacion = await Publicacion.findByPk(req.params.id);
    if (!publicacion) {
        return res.send('Publicacion no encontrada');
    }
    if (publicacion.usuarioId !== req.session.usuario.id) {
        return res.send('No autorizado');
    }
    res.render('feed/editar', { publicacion });
};

exports.editar = async (req, res) => {
    try {
        const publicacion = await Publicacion.findByPk(req.params.id);
        if (!publicacion) {
            return res.send('Publicacion no encontrada');
        }
        if (publicacion.usuarioId !== req.session.usuario.id) {
            return res.send('No autorizado');
        }

        publicacion.titulo = req.body.titulo;
        publicacion.descripcion = req.body.descripcion;

        if (req.file) {
            publicacion.imagen = req.file.filename;
            await Valoracion.destroy({
                where: { publicacionId: publicacion.id }
            });
        }

        await publicacion.save();
        res.redirect('/feed');
    } catch (error) {
        console.log(error);
        res.send('Error al editar');
    }
};

exports.feedSiguiendo = async (req, res) => {
    const seguimientos = await Seguimiento.findAll({
        where: { seguidorId: req.session.usuario.id }
    });

    const siguiendo = seguimientos.map(s => s.seguidoId);

    const publicaciones = await Publicacion.findAll({
        where: { usuarioId: { [Op.in]: siguiendo } },
        include: [
            Usuario,
            { model: Comentario, include: [Usuario] },
            { model: Valoracion }
        ],
        order: [['id', 'DESC']]
    });

    publicaciones.forEach(publicacion => {
        const valoraciones = publicacion.Valoracions || [];
        const cantidadVotos = valoraciones.length;

        const suma = valoraciones.reduce(
            (acc, valoracion) => acc + valoracion.puntaje,
            0
        );

        const promedio = cantidadVotos > 0 ? (suma / cantidadVotos).toFixed(1) : 0;

        publicacion.promedio = promedio;
        publicacion.cantidadVotos = cantidadVotos;
        publicacion.score = Number(promedio) + (cantidadVotos * 0.2);
    });

    res.render('feed/siguiendo', {
        publicaciones,
        usuario: req.session.usuario
    });
};

exports.toggleComentarios = async (req, res) => {
    try {
        const publicacion = await Publicacion.findByPk(req.params.id);
        if (!publicacion) {
            return res.send('Publicacion no encontrada');
        }
        if (publicacion.usuarioId !== req.session.usuario.id) {
            return res.send('No autorizado');
        }
        publicacion.comentariosCerrados = !publicacion.comentariosCerrados;
        await publicacion.save();
        res.redirect('/feed');
    } catch (error) {
        console.log(error);
        res.send('Error al cambiar estado de comentarios');
    }
};
