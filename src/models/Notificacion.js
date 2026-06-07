const { DataType, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Notificacion = sequelize.define('Notificacion',{

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },

    leida: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }

}, {
    tableName: 'notificaciones'

});

const Usuario = require('./Usuario');

Usuario.hasMany(Notificacion, {
    foreignKey: 'usuarioDestinoId'
});

Notificacion.belongsTo(Usuario, {
    foreignKey: 'usuarioDestinoId'
});

Notificacion.belongsTo(Usuario, {
    as: 'Emisor',
    foreignKey: 'usuarioEmisorId'
});

module.exports = Notificacion;