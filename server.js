
require ('dotenv').config();
const app = require('./src/app');
const sequelize = require('./src/config/db');
require('./src/models/Usuario');
require('./src/models/Publicacion');
require('./src/models/Comentario');
require('./src/models/Valoracion');
require('./src/models/Seguimiento');
require('./src/models/Interes');

const PORT = process.env.PORT || 3000;

    
    sequelize.sync()
    .then(()=>{
        console.log('PostgresSQL conectado');
        app.listen(PORT,()=>{
            console.log(`Servidor corriendo en puerto ${PORT}`);
        });
    })
    .catch(error => {
        console.log(error);
    })


