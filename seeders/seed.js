const bcrypt = require('bcrypt');

const sequelize = require('../src/config/db');
const Usuario = require('../src/models/Usuario');

async function seed() {


try {

    await sequelize.authenticate();

    console.log('Conectado a la base de datos');

    const passwordHash =
        await bcrypt.hash('123456', 10);

    await Usuario.findOrCreate({
        where: {
            email: 'admin@fotaza.com'
        },
        defaults: {
            nombre: 'Administrador',
            email: 'admin@fotaza.com',
            password: passwordHash,
            rol: 'admin',
            estado: true
        }
    });

    await Usuario.findOrCreate({
        where: {
            email: 'mauricio@fotaza.com'
        },
        defaults: {
            nombre: 'Mauricio',
            email: 'mauricio@fotaza.com',
            password: passwordHash,
            rol: 'usuario',
            estado: true
        }
    });

    await Usuario.findOrCreate({
        where: {
            email: 'emmanuel@fotaza.com'
        },
        defaults: {
            nombre: 'Emmanuel',
            email: 'emmanuel@fotaza.com',
            password: passwordHash,
            rol: 'usuario',
            estado: true
        }
    });

    console.log('Seed ejecutado correctamente');

    process.exit();

} catch (error) {

    console.error(error);

    process.exit(1);
}


}

seed();
