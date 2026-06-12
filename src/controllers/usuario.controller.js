
const Usuario = require('../models/Usuario');
const Seguimiento = require('../models/Seguimiento');
const Coleccion = require('../models/Coleccion');
const Publicacion = require('../models/Publicacion');
const Favorito = require('../models/Favorito'); 

exports.perfil = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();

    const seguimientos = await Seguimiento.findAll({
      where: { seguidorId: req.session.usuario.id }
    });
    const siguiendo = seguimientos.map(s => s.seguidoId);
    const cantidadSiguiendo = siguiendo.length;

    const cantidadSeguidores = await Seguimiento.count({
      where: { seguidoId: req.session.usuario.id }
    });

    const colecciones = await Coleccion.findAll({
      where: { usuarioId: req.session.usuario.id }
    });

    const publicaciones = await Publicacion.findAll({
      where: { usuarioId: req.session.usuario.id },
      order: [['id', 'DESC']]
    });

    publicaciones.forEach(publicacion => {
      publicacion.listaImagenes = publicacion.imagen
        ? publicacion.imagen.split(',')
        : [];
    });

    // ✅ consulta de favoritos
    const favoritos = await Favorito.findAll({
      where: { usuarioId: req.session.usuario.id }
    });

    res.render('usuario/perfil', {
      usuario: req.session.usuario,
      usuarios,
      siguiendo,
      cantidadSiguiendo,
      cantidadSeguidores,
      colecciones,
      publicaciones,
      favoritos
    });
  } catch (error) {
    console.log(error);
    res.send('Error al cargar perfil');
  }
};
