const Publicacion = require('../models/Publicacion');

exports.feed =async (req, res) => {

    const publicaciones = await Publicacion.findAll({
        order: [['id','DESC']]
    });

    res.render('feed/index',{
        publicaciones,
        usuario: req.session.usuario
    });
};

exports.formCrear = (req, res) => {
    try {

       await Publicacion.create({
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        imagen: req.file.filename,
        usuarioId: req.session.usuario.id
       });

       res.redirect('/feed');
    }catch (error) {

        console.log(error);
        res.send('Error al publicar');
    }
};
