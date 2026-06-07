const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Usuario = require('./Usuario');
const Publicacion = require('./Publicacion');

const Interes = sequelize.define('Interes', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }

}, {
    tableName: 'intereses'
});

Usuario.hasMany(Interes, {
    foreignKey: 'usuarioId'
});

Publicacion.hasMany(Interes, {
    foreignKey: 'publicacionId'
});

Interes.belongsTo(Publicacion, {
    foreignKey: 'publicacionId'
});

module.exports = Interes;