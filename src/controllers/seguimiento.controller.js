const Seguimiento = require('../models/Seguimiento');

exports.seguir = async (req, res) => {

    console.log('=== SEGUIR===');
    console.log('Usuario logueado:', req.session.usuario.id);
    console.log('Usuario a seguir:', req.params.id);
    try{

        const seguidorId = req.session.usuario.id;
        const seguidoId = req.params.id;

        if (seguidorId == seguidoId) {
            return res.send('No puedes seguirte a ti mismo');

        }

        const existe = await Seguimiento.findOne({

            where: {
                seguidorId,
                seguidoId
            }
        });

        console.log('Existe:', existe);

        if (existe) {
            return res.redirect('/feed');
        }

        console.log('Voy a crear seguimiento');

        await Seguimiento.create({
            seguidorId,
            seguidoId
        });

        console.log('Seguimiento creado')

        res.redirect('/feed');
    } catch (error) {
        console.log('ERROR SEGUIR')
        console.log(error);
        res.send('Error al seguir usuario');

    }

};