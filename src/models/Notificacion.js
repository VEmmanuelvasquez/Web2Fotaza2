const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Notificacion = sequelize.define('Notificacion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  tipo: {
    type: DataTypes.STRING, // 'denuncia', 'comentario', 'valoracion', 'seguimiento'
    allowNull: false
  },

  leida: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },

  usuarioDestinoId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  usuarioEmisorId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  publicacionId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },

  comentarioId: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'notificaciones'
});

// Relaciones
const Usuario = require('./Usuario');
const Publicacion = require('./Publicacion');
const Comentario = require('./Comentario');

Usuario.hasMany(Notificacion, { foreignKey: 'usuarioDestinoId' });
Notificacion.belongsTo(Usuario, { foreignKey: 'usuarioDestinoId' });

Notificacion.belongsTo(Usuario, { as: 'Emisor', foreignKey: 'usuarioEmisorId' });

Notificacion.belongsTo(Publicacion, { foreignKey: 'publicacionId' });
Notificacion.belongsTo(Comentario, { foreignKey: 'comentarioId' });

module.exports = Notificacion;
