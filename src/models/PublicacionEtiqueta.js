const {DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const PublicacionEtiqueta = sequelize.define(
    'PublicacionEtiqueta',
    {},
    {
        tableName: 'publicacion_etiquetas'
    }
);

module.exports = PublicacionEtiqueta;