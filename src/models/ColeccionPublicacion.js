const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Coleccion = require('./Coleccion');

const ColeccionPublicacion = sequelize.define(
    'ColeccionPublicacion',
     {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

    
    coleccionId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    publicacionId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
    },

    {
        tableName:'coleccion_publicaciones'

    });

    module.exports = ColeccionPublicacion;