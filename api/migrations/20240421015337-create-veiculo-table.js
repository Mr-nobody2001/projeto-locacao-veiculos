'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('veiculos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      informacoesVeiculoId: {
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

    await queryInterface.addConstraint('veiculos', {
      fields: ['informacoesVeiculoId'],
      type: 'foreign key',
      name: 'FK_veiculos_informacoes_veiculo',
      references: {
        table: 'informacoes-veiculo',
        field: 'id'
      },
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT'
    });

    await queryInterface.addConstraint('veiculos', {
      fields: ['corId'],
      type: 'foreign key',
      name: 'FK_veiculos_cores',
      references: {
        table: 'cores',
        field: 'id'
      },
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT'
    });

    await queryInterface.addConstraint('veiculos', {
      fields: ['categoriaId'],
      type: 'foreign key',
      name: 'FK_veiculos_categoria',
      references: {
        table: 'categorias',
        field: 'id'
      },
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('veiculos', 'FK_veiculos_informacoes_veiculo');
    await queryInterface.removeConstraint('veiculos', 'FK_veiculos_cores');
    await queryInterface.removeConstraint('veiculos', 'FK_veiculos_categoria');
    await queryInterface.dropTable('veiculos');
  }
};
