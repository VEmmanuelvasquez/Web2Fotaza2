

const Notificacion = require('../models/Notificacion');
const Usuario = require('../models/Usuario');
const Publicacion = require('../models/Publicacion');

// Listar notificaciones
exports.listar = async (req, res) => {
  const notificaciones = await Notificacion.findAll({
    where: { usuarioDestinoId: req.session.usuario.id },
    include: [
      { model: Usuario, as: 'Emisor' },
      { model: Publicacion } // 👈 trae la publicación asociada
    ],
    order: [['createdAt', 'DESC']]
  });

  res.render('notificacion/notificacion', { notificaciones });
};

// Marcar como leída
exports.leer = async (req, res) => {
  const notificacion = await Notificacion.findByPk(req.params.id);

  if (notificacion) {
    notificacion.leida = true;
    await notificacion.save();

    if (notificacion.publicacionId) {
      req.session.lastPubId = notificacion.publicacionId;
    }
  }

  res.redirect('/notificaciones');
};
