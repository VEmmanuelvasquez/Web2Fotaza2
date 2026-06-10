require('dotenv').config();

const sequelize = require('../src/config/db');

require('../src/models/Usuario');
require('../src/models/Publicacion');
require('../src/models/Comentario');
require('../src/models/Valoracion');
require('../src/models/Seguimiento');
require('../src/models/Interes');
require('../src/models/Favorito');
require('../src/models/Coleccion');
require('../src/models/ColeccionPublicacion');
require('../src/models/Notificacion');
require('../src/models/Denuncia');

sequelize.sync()
.then(() => {
    console.log('Base de datos inicializada correctamente');
    process.exit(0);
})
.catch(error => {
    console.log(error);
    process.exit(1);
});