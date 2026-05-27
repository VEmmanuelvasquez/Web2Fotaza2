
require ('dotenv')-config();
const app = require('./src/app');
const sequelize = require('./src/config/database');
const PORT = process.env.PORT || 3000;

    
    sequelize.authenticate()
    .then(()=>{
        console.log('PostgresSQL conectado');
        app.listen(PORT,()=>{
            console.log('Servidor corriendo en puerta ${PORT}');
        });
    })
    .catch(error => {
        console.log(error);
    })


