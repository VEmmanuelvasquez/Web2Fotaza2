const bcrypt = require('bcrypt');

const Usuario = require('../models/Usuario');

exports.showRegister = (req,res) => {
    res.render('auth/register');


};

exports.register = async (req,res) => {
    try{
        const{ nombre, email, password} = req.body;
        const existe = await Usuario.findOne({
            where: {email}
        });

        if(existe){
            return res.send(' el mail ya existe');

        }

        const hash = await bcrypt.hash(password, 10);
        await Usuario.create({

            nombre,
            email,
            password: hash
        });
        req.session.lastPubId = publicacionId;
        res.redirect('/auth/login');

    } catch (error){
        console.log(error);
        res.send('Error al registrar');

    }


};

exports.showLogin = (req,res) => {
    res.render('auth/login');
    


};
exports.login =async (req,res) => {
    try{
        const{email,password} =req.body;
        const usuario = await Usuario.findOne ({   
            where: {email}
        });

        if (!usuario) {
            return res.send('usuario no encontrado');

        }
        if (!usuario.estado) {
        return res.send('Tu cuanta a sido desactivada por un administrador');
        }
        

        const valido =await bcrypt.compare(
            password,
            usuario.password
        );

        if(!valido) {
            return res.send('Contraseña incorrecta');

        }
        req.session.usuario = {
            id: usuario.id,
            nombre: usuario.nombre,
            rol: usuario.rol
        };

        req.session.save(() => {
           if(usuario.rol === 'admin') {
            return res.redirect('/admin');
           }

           return res.redirect('/feed');
        });

    } catch (error) {
      console.log(error);
      res.send('Error login');

    }

};

exports.logout = (req,res) => {
    req.session.destroy(() =>{
        res.redirect('/');
    });
};
    
