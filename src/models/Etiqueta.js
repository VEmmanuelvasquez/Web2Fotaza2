const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Etiqueta = sequelize.define('Etiqueta', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }

}, {
    tableName: 'etiquetas'
});

const Publicacion = require('./Publicacion');
const PublicacionEtiqueta = require('./PublicacionEtiqueta');

Etiqueta.belongsToMany(Publicacion, {
    through: PublicacionEtiqueta,
    foreignKey: 'etiquetaId'
});

Publicacion.belongsToMany(Etiqueta, {
    through: PublicacionEtiqueta,
    foreignKey: 'publicacionId'
});

module.exports = Etiqueta;