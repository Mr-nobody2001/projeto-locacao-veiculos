'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Veiculos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      informacoesVeiculosId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      placa: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      corId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      categoriaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      quilometragem: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
      },
      disponibilidade: {
        type: Sequelize.ENUM('manutencao', 'disponivel', 'indisponivel'),
        allowNull: false,
        defaultValue: 'disponivel'
      },
      ultimaManutencao: {
        type: Sequelize.DATE,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    await queryInterface.addConstraint('Veiculos', {
      fields: ['informacoesVeiculosId'],
      type: 'foreign key',
      name: 'FK_veiculos_informacoes_veiculos',
      references: {
        table: 'InformacoesVeiculos',
        field: 'id'
      },
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT'
    });

    await queryInterface.addConstraint('Veiculos', {
      fields: ['corId'],
      type: 'foreign key',
      name: 'FK_veiculos_cores',
      references: {
        table: 'Cores',
        field: 'id'
      },
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT'
    });

    await queryInterface.addConstraint('Veiculos', {
      fields: ['categoriaId'],
      type: 'foreign key',
      name: 'FK_veiculos_categoria',
      references: {
        table: 'Categorias',
        field: 'id'
      },
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Veiculos', 'FK_veiculos_informacoes_veiculos');
    await queryInterface.removeConstraint('Veiculos', 'FK_veiculos_cores');
    await queryInterface.removeConstraint('Veiculos', 'FK_veiculos_categoria');
    await queryInterface.dropTable('Veiculos');
  }
};
