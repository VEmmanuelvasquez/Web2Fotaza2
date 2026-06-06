const Usuario = require('../models/Usuario');
const Seguimiento = require('../models/Seguimiento');
const publicacion = require('../models/Publicacion');
const Publicacion = require('../models/Publicacion');
exports.perfil = async (req, res) => {
     
    console.log("ID recibido:", req.params.id);

    const usuarioPerfil = await Usuario.findByPk(
        req.params.id
    );

    if (!usuarioPerfil) {
        return res.send('Usuario no encontrado');
    }

    const cantidadSeguidores =
    await Seguimiento.count({
        where: {
            seguidoId: usuarioPerfil.id
        }
        
    });

const cantidadSiguiendo =
    await Seguimiento.count({
        where: {
            seguidorId: usuarioPerfil.id
        }
    });

const publicaciones = await Publicacion.findAll({
    where: {
        usuarioId: usuarioPerfil.id
    },
    order: [['id', 'DESC']]
})

res.render('usuario/perfil',{
    usuarioPerfil,
    cantidadSeguidores,
    cantidadSiguiendo,
    publicaciones
});

};