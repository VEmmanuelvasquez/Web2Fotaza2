const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const DenunciaComentario = sequelize.define('DenunciaComentario', {

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
    tableName: 'denuncias_comentarios'
});

const Usuario = require('./Usuario');
const Comentario = require('./Comentario');

Usuario.hasMany(DenunciaComentario,{
    foreignKey:'usuarioId'
});

DenunciaComentario.belongsTo(Usuario,{
    foreignKey:'usuarioId'
});

Comentario.hasMany(DenunciaComentario,{
    foreignKey:'comentarioId'
});

DenunciaComentario.belongsTo(Comentario,{
    foreignKey:'comentarioId'
});



module.exports = DenunciaComentario;