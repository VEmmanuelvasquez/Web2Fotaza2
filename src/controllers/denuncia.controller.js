const Denuncia = require('../models/Denuncia');

exports.crear = async(req, res) => {

     try{
    const existe = await Denuncia.findOne({

        where: {
            usuarioId: req.session.usuario.id,
            publicacionId: req.params.id
        }
    });

    if(existe){
        return res.send('Ya denunciaste esta publicacion');

    }
    
    await Denuncia.create({
        motivo: req.body.motivo,
        descripcion: req.body.descripcion,

        usuarioId: req.session.usuario.id,
        publicacionId: req.params.id
    });
    req.session.lastPubId = publicacionId;
    res.redirect('/feed');
     }catch(error){

        console.log('ERROR DENUNCIA');
        console.log(error);

        res.send('Error al denunciar');
     }
};