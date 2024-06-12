'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('ReservasVeiculos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      informacoesVeiculoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      veiculoId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      clienteId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      checkInForecast: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      checkOutForecast: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      checkIn: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      checkOut: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM
          (
            'Reservado', 
            'Alugado',
            'Finalizado',
            'Cancelado'
          ),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      canceledAt: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });

    await queryInterface.addConstraint('ReservasVeiculos', {
      fields: ['informacoesVeiculoId'],
      type: 'foreign key',
      name: 'FK_reservas_veiculos_informacoes_veiculo',
      references: {
        table: 'InformacoesVeiculos',
        field: 'id'
      },
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT'
    });

    await queryInterface.addConstraint('ReservasVeiculos', {
      fields: ['veiculoId'],
      type: 'foreign key',
      name: 'FK_reservas_veiculos_veiculos',
      references: {
        table: 'Veiculos',
        field: 'id'
      },
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT'
    });

    await queryInterface.addConstraint('ReservasVeiculos', {
      fields: ['clienteId'],
      type: 'foreign key',
      name: 'FK_reservas_veiculos_clientes',
      references: {
        table: 'Clientes',
        field: 'id'
      },
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Veiculos', 'FK_reservas_veiculos_veiculos');
    await queryInterface.removeConstraint('Clientes', 'FK_reservas_veiculos_clientes');
    await queryInterface.dropTable('ReservasVeiculos');
  }
};
