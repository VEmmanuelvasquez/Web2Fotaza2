const { DataTypes } =require('sequelize');
const sequelize = require('../config/db');
const Usuario = require('./Usuario');

const Seguimiento = sequelize.define('seguimiento', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true

    }
}, {
    tableName: 'seguimientos'

});

Usuario.belongsToMany(Usuario, {
    through:Seguimiento,
    as:'seguidos',
    foreignKey: 'seguidorId'
});


Usuario.belongsToMany(Usuario, {
    through: Seguimiento,
    as: 'seguidores',
    foreignKey: 'seguidoId'
});

module.exports = Seguimiento;