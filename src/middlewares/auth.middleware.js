exports.isAuth = (req, res, next) =>{

    if (!req.session.usuario) {

        return res.redirect('/auth/login');

    }

    next();
};

exports.isAdmin = (req, res, next) => {

    if (!req.session.usuario) {
        return res.redirect('/auth/login');
    }

    if (req.session.usuario.rol !== 'admin') {
        return res.send('Acesso denegado');
    }

    next();
};