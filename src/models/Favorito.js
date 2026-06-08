const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Favorito = sequelize.define('Favorito', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
}, {
    tableName:'favoritos'
});

const Usuario = require('./Usuario');
const Publicacion = require('./Publicacion');

Usuario.belongsToMany(Publicacion, {
    through: Favorito,
    foreignKey: 'usuarioId'
});

Publicacion.belongsToMany(Usuario, {
    through: Favorito,
    foreignKey: 'publicacionId'
});

Favorito.belongsTo(Usuario, {
  
    foreignKey: 'usuarioId'
});

Favorito.belongsTo(Publicacion, {
    foreignKey: 'publicacionId'
});

module.exports = Favorito;