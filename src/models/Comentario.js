const { DataTypes } = require ('sequelize');
const sequelize = require('../config/db');
const Usuario = require('./Usuario');
const Publicacion = require('./Publicacion');
const Comentario = sequelize.define('comentario', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    texto: {
        type: DataTypes.TEXT,
        allowNull: false
    }

}, {
    tableName: 'comentarios'

});

Usuario.hasMany(Comentario, {
    foreignKey: 'usuarioId'
});

Comentario.belongsTo(Usuario, {
    foreignKey: 'usuarioId'
});

Publicacion.hasMany(Comentario, {
    foreignKey: 'publicacionId'
});

Comentario.belongsTo(Publicacion, {
    foreignKey: 'publicacionId'
});

module.exports = Comentario;