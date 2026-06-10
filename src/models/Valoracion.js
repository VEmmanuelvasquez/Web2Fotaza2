const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Usuario = require('./Usuario');
const Publicacion = require('./Publicacion');

const Valoracion = sequelize.define('Valoracion', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    puntaje: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

    }, {
        tableName: 'valoraciones'
    
});

Usuario.hasMany(Valoracion, {
    foreignKey: 'usuarioId'
});

Valoracion.belongsTo(Usuario, {
    foreignKey: 'usuarioId'
});

Publicacion.hasMany(Valoracion, {
    foreignKey: 'publicacionId'
});

Valoracion.belongsTo(Publicacion, {
    foreignKey: 'publicacionId'
});

module.exports = Valoracion;