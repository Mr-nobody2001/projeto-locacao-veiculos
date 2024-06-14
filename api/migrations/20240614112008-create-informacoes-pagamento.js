'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('InformacoesPagamento', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      cliente_id: {
        type: Sequelize.INTEGER,
        allowNull: false, 
      },
      numero_cartao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nome_titular: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      validade: {
        type: Sequelize.DATE,
        allowNull: true
      },
      codigo_seguranca: {
        type: Sequelize.INTEGER,
        allowNull: false,
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

    await queryInterface.addConstraint('InformacoesPagamento', {
      fields: ['cliente_id'],
      type: 'foreign key',
      name: 'FK_informacoes_pagamento_clientes',
      references: {
        table: 'Clientes',
        field: 'id'
      },
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT'
    });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Clientes', 'FK_informacoes_pagamento_clientes');
    await queryInterface.dropTable('InformacoesPagamento');
  }
};
