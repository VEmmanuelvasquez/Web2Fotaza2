const Comentario = require('../models/Comentario');
const Publicacion = require('../models/Publicacion');
const Notificacion = require('../models/Notificacion');

exports.crear = async (req, res) => {

    try {

        await Comentario.create({

            texto: req.body.texto,
            usuarioId: req.session.usuario.id,
            publicacionId: req.params.id
        });
        
        const publicacion = await Publicacion.findByPk(req.params.id);

        if (
            publicacion && publicacion.usuarioId !== req.session.usuario.id
        ) {
            
        await  Notificacion.create({
            tipo: 'comentario',
            usuarioDestinoId: publicacion.usuarioId,
            usuarioEmisorId: req.session.usuario.id
        });
    }
    res.redirect('/feed');
    
    } catch (error) {

        console.log(error);
        res.send('Error al comentar');
    }   
};
