const {DataTypes} = require('sequelize');
const db = require('../config/db.js');
const Pais = require('./pais.js');
const Empresa = require('./empresa.js');

const EventoSector = db.define('EventoSector', {
    id_evento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    tipo_evento: {
        type: DataTypes.ENUM('Inversión', 'Hackeo', 'Adquisición', 'Cierre', 'Otro'),
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    pais_afectado: {
        type: DataTypes.CHAR(3),
        allowNull: false
    },
    empresa_relacionada: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    imagen_evento: {
    type: DataTypes.STRING,
    allowNull: true,
    },
}, {
    tableName: 'eventos_sectores',
    timestamps: true
});

// Relación con el modelo Pais
//Pais.hasMany(EventoSector, { foreignKey: 'pais_afectado' });
//EventoSector.belongsTo(Pais, { foreignKey: 'pais_afectado' });

// Relación con el modelo Empresa
Empresa.hasMany(EventoSector, { foreignKey: 'empresa_relacionada' });
EventoSector.belongsTo(Empresa, { foreignKey: 'empresa_relacionada' });

// Exportar el modelo
module.exports = EventoSector;