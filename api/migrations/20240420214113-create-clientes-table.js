'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Clientes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            nome: {
                allowNull: false,
                type: Sequelize.STRING
            },
            data_nascimento: {
                allowNull: false,
                type: Sequelize.DATE
            },
            cpf: {
                allowNull: false,
                unique: true,
                type: Sequelize.STRING
            },
            telefone: {
                allowNull: false,
                type: Sequelize.STRING
            },
            email: {
                allowNull: false,
                unique: true,
                type: Sequelize.STRING
            },
            senha: {
                allowNull: false,
                type: Sequelize.STRING
            },
            endereco: {
                allowNull: false,
                type: Sequelize.STRING
            },
            status: {
                allowNull: false,
                defaultValue: true,
                type: Sequelize.BOOLEAN
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Clientes');
    }
};
