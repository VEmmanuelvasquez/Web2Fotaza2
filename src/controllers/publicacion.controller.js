const Publicacion = require('../models/Publicacion');
const Usuario = require('../models/Usuario');
const { Op } = require('sequelize');
const Comentario = require('../models/Comentario');
const Valoracion = require('../models/Valoracion');
const Seguimiento = require('../models/Seguimiento');
const Coleccion = require('../models/Coleccion');
const Etiqueta = require('../models/Etiqueta');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');


exports.feed = async (req, res) => {
  const busqueda = req.query.q || '';
  let whereClause = busqueda
    ? {
        [Op.or]: [
          { titulo: { [Op.iLike]: `%${busqueda}%` } },
          { descripcion: { [Op.iLike]: `%${busqueda}%` } },
          { '$Usuario.nombre$': { [Op.iLike]: `%${busqueda}%` } },
          { '$Etiquetas.nombre$': { [Op.iLike]: `%${busqueda}%` } }
        ]
      }
    : {};

  const publicaciones = await Publicacion.findAll({
    include: [
      Usuario,
      { model: Comentario, include: [Usuario] },
      { model: Valoracion },
      { model: Etiqueta }
    ],
    where: whereClause,
    order: [['id', 'DESC']]
  });

  publicaciones.forEach(publicacion => {
    publicacion.listaImagenes = publicacion.imagen ? publicacion.imagen.split(',') : [];

    // Invitados: si la publicación es copyright, no mostrar imágenes
    if (!req.session.usuario && publicacion.licencia === 'copyright') {
      publicacion.listaImagenes = [];
      publicacion.mensajeInvitado = 'Debes registrarte para ver esta imagen';
    }

    const valoraciones = publicacion.Valoracions || [];
    const cantidadVotos = valoraciones.length;
    const suma = valoraciones.reduce((acc, valoracion) => acc + valoracion.puntaje, 0);
    const promedio = cantidadVotos > 0 ? (suma / cantidadVotos).toFixed(1) : 0;

    publicacion.promedio = promedio;
    publicacion.cantidadVotos = cantidadVotos;
    publicacion.score = Number(promedio) + (cantidadVotos * 0.2);
  });

  // Inicializar variables para invitados
  let usuarios = [];
  let siguiendo = [];
  let cantidadSiguiendo = 0;
  let cantidadSeguidores = 0;
  let colecciones = [];

  if (req.session && req.session.usuario) {
    usuarios = await Usuario.findAll();

    const seguimientos = await Seguimiento.findAll({
      where: { seguidorId: req.session.usuario.id }
    });

    siguiendo = seguimientos.map(s => s.seguidoId);
    cantidadSiguiendo = siguiendo.length;

    cantidadSeguidores = await Seguimiento.count({
      where: { seguidoId: req.session.usuario.id }
    });

    colecciones = await Coleccion.findAll({
      where: { usuarioId: req.session.usuario.id }
    });
  }

  const destacadas = publicaciones
    .filter(p => p.cantidadVotos >= 3 && p.promedio >= 3.5)
    .sort((a, b) => b.score - a.score);

  const normales = publicaciones
    .filter(p => !(p.cantidadVotos >= 3 && p.promedio >= 3.5))
    .sort(() => Math.random() - 0.5);

  const publicacionesHome = [...destacadas, ...normales.slice(0, 5)];

  res.render('feed/index', {
    publicaciones: publicacionesHome,
    usuarios,
    siguiendo,
    cantidadSiguiendo,
    cantidadSeguidores,
    usuario: req.session.usuario || null,
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
        console.log('FILES:', req.files);
        const imagenes = req.files ? req.files.map(archivo => archivo.filename) : [];

        if (req.body.licencia === 'copyright' && req.body.marcaAgua && req.body.textoMarcaAgua) {
            for (const archivo of req.files) {
                const ruta = path.join(__dirname, '../public/uploads', archivo.filename);
                const rutaTemp = path.join(__dirname, '../public/uploads', 'temp-' + archivo.filename);
                const stats = await sharp(ruta).stats();

                const brillo = (stats.channels[0].mean + stats.channels[1].mean + stats.channels[2].mean) / 3;
                const colorTexto = brillo > 128 ? 'black' : 'white';

                const svg = `
<svg width="1200" height="300">
  <text
    x="50"
    y="150"
    font-size="80"
    fill="${colorTexto}"
    stroke="${colorTexto === 'white' ? 'black' : 'white'}"
    stroke-width="2"
    opacity="0.6"
    font-family="Arial">
    ${req.body.textoMarcaAgua}
  </text>
</svg>
`;

                await sharp(ruta)
                    .composite([{ input: Buffer.from(svg), gravity: 'southeast' }])
                    .toFile(rutaTemp);

                fs.renameSync(rutaTemp, ruta);
            }
        }

        const publicacion = await Publicacion.create({
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            imagen: imagenes.join(','),
            licencia: req.body.licencia,
            marcaAgua: req.body.marcaAgua ? true : false,
            textoMarcaAgua: req.body.textoMarcaAgua,
            usuarioId: req.session.usuario.id
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

        if (req.files && req.files.length > 0) {
            const imagenes = req.files.map(archivo => archivo.filename);
            publicacion.imagen = imagenes.join(',');
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
        const suma = valoraciones.reduce((acc, valoracion) => acc + valoracion.puntaje, 0);
        const promedio = cantidadVotos > 0 ? (suma / cantidadVotos).toFixed(1) : 0;

        publicacion.promedio = promedio;
        publicacion.cantidadVotos = cantidadVotos;
        publicacion.score = Number(promedio) + (cantidadVotos * 0.2);
        publicacion.listaImagenes = publicacion.imagen ? publicacion.imagen.split(',') : [];
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