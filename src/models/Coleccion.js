const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Usuario = require('./Usuario');
const Publicacion = require('./Publicacion');
const ColeccionPublicacion = require('./ColeccionPublicacion');


const Coleccion = sequelize.define('Coleccion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
    tableName:'colecciones'
});

Usuario.hasMany(Coleccion, {
    foreignKey: 'usuarioId'
});

Coleccion.belongsTo(Usuario, {
    foreignKey: 'usuarioId'
});

Coleccion.belongsToMany(Publicacion, {
    through: ColeccionPublicacion,
    foreignKey: 'coleccionId'
});

Publicacion.belongsToMany(Coleccion, {
    through: ColeccionPublicacion,
    foreignKey: 'publicacionId'
});

module.exports = Coleccion;