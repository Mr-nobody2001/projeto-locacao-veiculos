const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const Veiculo = sequelize.define('Veiculo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    marca: {
        type: DataTypes.STRING,
        allowNull: false
    },
    modelo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    anoFabricacao: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    placa: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    cor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'cores',
            key: 'id'
        },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT'
    },
    quilometragem: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    disponibilidade: {
        type: DataTypes.ENUM,
        values: ['manutencao', 'disponivel', 'indisponivel'],
        allowNull: false
    },
    precoLocacao: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ultimaManutencao: {
        type: DataTypes.DATE,
        allowNull: true
    },
});

module.exports = Veiculo;

