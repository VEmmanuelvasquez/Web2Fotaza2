const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const Usuario = require('./Usuario');
const Publicacion = sequelize.define('Publicacion', {
    
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    titulo: {
        type: DataTypes.STRING,

        allowNull: false
    },

    descripcion: {
        type:DataTypes.TEXT,
        allowNull: false
    },

    imagen: {

        type: DataTypes.STRING,
        allowNull: false
}

},{

    tableName: 'publicaciones'

});

Usuario.hasMany(Publicacion,{
    foreignKey: 'usuarioId'
});

Publicacion.belongsTo(Usuario,{
    foreignKey: 'usuarioId'
});

module.exports = Publicacion;