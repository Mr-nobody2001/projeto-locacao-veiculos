'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Array de dados das categorias
    const categoriasData = [
      { nome: 'Compacto', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Sedan', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Hatch', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'SUV', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Crossover', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Picape', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Esportivo', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Utilitário', createdAt: new Date(), updatedAt: new Date() }
    ];

    await queryInterface.bulkInsert('Categorias', categoriasData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categorias', null, {});
  }
};
