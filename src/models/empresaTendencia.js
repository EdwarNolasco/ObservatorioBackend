const {DataTypes} = require('sequelize');
const db = require('../config/db.js');
const Empresa = require('./empresa.js');
const TendenciaTecnologica = require('./tendenciatecnologica.js');

const EmpresaTendencia = db.define('EmpresaTendencia', {
    id_empresa: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_tendencia: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'empresas_tendencias',
    timestamps: true
});

// Relación con el modelo Empresa
Empresa.hasMany(EmpresaTendencia, { foreignKey: 'id_empresa' });
EmpresaTendencia.belongsTo(Empresa, { foreignKey: 'id_empresa' });

// Relación con el modelo TendenciaTecnologica
TendenciaTecnologica.hasMany(EmpresaTendencia, { foreignKey: 'id_tendencia' });
EmpresaTendencia.belongsTo(TendenciaTecnologica, { foreignKey: 'id_tendencia' });

// Exportar el modelo
module.exports = EmpresaTendencia;