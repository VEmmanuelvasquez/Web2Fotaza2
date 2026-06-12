const Denuncia = require('../models/Denuncia');
const Publicacion = require('../models/Publicacion');
const Notificacion = require('../models/Notificacion');

exports.crear = async (req, res) => {
  try {
    const existe = await Denuncia.findOne({
      where: {
        usuarioId: req.session.usuario.id,
        publicacionId: req.params.id
      }
    });

    if (existe) {
      return res.send('Ya denunciaste esta publicación');
    }

    const denuncia = await Denuncia.create({
      motivo: req.body.motivo,
      descripcion: req.body.descripcion,
      usuarioId: req.session.usuario.id,
      publicacionId: req.params.id
    });

    const publicacion = await Publicacion.findByPk(req.params.id);

    if (publicacion) {
      await Notificacion.create({
        tipo: 'denuncia',
        usuarioDestinoId: publicacion.usuarioId,   // dueño de la publicación
        usuarioEmisorId: req.session.usuario.id,   // el que denuncia
        publicacionId: publicacion.id,
        leida: false
      });
    }

    
    res.redirect('/feed');
  } catch (error) {
    console.log('ERROR DENUNCIA');
    console.log(error);
    res.send('Error al denunciar');
  }
};
