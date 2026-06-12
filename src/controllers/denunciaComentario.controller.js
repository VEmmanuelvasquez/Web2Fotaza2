const Usuario = require('../models/Usuario');
const Comentario = require('../models/Comentario');
const Publicacion = require('../models/Publicacion');
const DenunciaComentario = require('../models/DenunciaComentario');

exports.listar = async (req,res)=>{

    const denuncias =
    await DenunciaComentario.findAll({

        include:[
            Usuario,
            {
                model: Comentario,
                include:[Publicacion]
            }
        ]
    });

    const denunciasFiltradas = denuncias.filter(
        d =>
        d.comentario &&
        d.comentario.Publicacion &&
        d.comentario.Publicacion.usuarioId ===
        req.session.usuario.id
    );

    res.render(
        'denunciaComentario/listar',
        {
            denuncias: denunciasFiltradas
        }
    );
};

exports.crear = async(req,res)=>{

    const existe =
    await DenunciaComentario.findOne({

        where:{
            usuarioId:req.session.usuario.id,
            comentarioId:req.params.id
        }
    });

    if(existe){
        return res.send(
            'Ya denunciaste este comentario'
        );
    }

    await DenunciaComentario.create({

        motivo:req.body.motivo,
        descripcion:req.body.descripcion,

        usuarioId:req.session.usuario.id,
        comentarioId:req.params.id
    });
    req.session.lastPubId = publicacionId;
    res.redirect('/feed');
};

exports.eliminarComentario = async (req,res) => {

    try {

        const comentario =
        await Comentario.findByPk(
            req.params.id,
            {
                include:[Publicacion]
            }
        );

        if(!comentario){
            return res.send(
                'Comentario no encontrado'
            );
        }

        if(
            comentario.Publicacion.usuarioId !==
            req.session.usuario.id
        ){
            return res.send(
                'No autorizado'
            );
        }

        await DenunciaComentario.destroy({
            where:{
                comentarioId: comentario.id
            }
        });

        await comentario.destroy();

        res.redirect('/denuncias-comentarios');

    } catch(error){

        console.log(error);

        res.send(
            'Error al eliminar comentario'
        );
    }
};