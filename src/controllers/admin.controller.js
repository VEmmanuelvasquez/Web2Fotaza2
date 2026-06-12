const Usuario = require('../models/Usuario');

exports.panel = async (req, res) => {

    const usuarios = await Usuario.findAll({
        order: [['id', 'ASC']]
    });

    res.render('admin/admin', {
        usuarios
    });

};

exports.cambiarEstado = async(req, res) => {
    const usuario = await Usuario.findByPk(
        req.params.id
    );

     if (!usuario){
        return res.send('USUARIO no encontrado');
    }

    if (usuario.rol === 'admin') {
        return res.send('No se puede desactivar un administrador');
    }

    usuario.estado = !usuario.estado;

    await usuario.save();
    req.session.lastPubId = publicacionId;
    res.redirect('/admin');
};