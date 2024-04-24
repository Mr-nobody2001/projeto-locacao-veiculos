'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        const currentDate = new Date();
        const colors = [
            {nome: 'Preto', createdAt: currentDate, updatedAt: currentDate},
            {nome: 'Branco', createdAt: currentDate, updatedAt: currentDate},
            {nome: 'Prata', createdAt: currentDate, updatedAt: currentDate},
            {nome: 'Cinza', createdAt: currentDate, updatedAt: currentDate},
            {nome: 'Azul', createdAt: currentDate, updatedAt: currentDate},
            {nome: 'Vermelho', createdAt: currentDate, updatedAt: currentDate},
            {nome: 'Amarelo', createdAt: currentDate, updatedAt: currentDate},
            {nome: 'Laranja', createdAt: currentDate, updatedAt: currentDate},
        ];

        return queryInterface.bulkInsert('Cores', colors);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Cores', null, {});
    }
};
