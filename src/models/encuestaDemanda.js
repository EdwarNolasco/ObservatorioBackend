const {DataTypes} = require('sequelize');
const db = require('../config/db.js');
const ProductoServicio = require('./productoservicio.js');
const Pais = require('./pais.js');

const EncuestaDemanda = db.define('EncuestaDemanda', {
    id_encuesta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    porcentaje_demanda: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    anio: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    tableName: 'encuestas_demanda',
    timestamps: true
});

// Relación con el modelo ProductoServicio
ProductoServicio.hasMany(EncuestaDemanda, { foreignKey: 'id_producto' });
EncuestaDemanda.belongsTo(ProductoServicio, { foreignKey: 'id_producto' });

// Exportar el modelo
module.exports = EncuestaDemanda;