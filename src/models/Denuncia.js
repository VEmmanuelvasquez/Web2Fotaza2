const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Denuncia = sequelize.define('Denuncia', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    motivo: {
        type: DataTypes.STRING,
        allowNull: false
    },

    descripcion: {
         type: DataTypes.TEXT,
         allowNull: false
    }

}, {
    tableName: 'denuncias'
});

const Usuario = require('./Usuario');
const Publicacion = require('./Publicacion');

Usuario.hasMany(Denuncia,{
    foreignKey: 'usuarioId'
});

Denuncia.belongsTo(Usuario,{
    foreignKey: 'usuarioId'
});

Publicacion.hasMany(Denuncia,{
    foreignKey: 'publicacionId'
});

Denuncia.belongsTo(Publicacion,{
    foreignKey: 'publicacionId'
});

module.exports = Denuncia;