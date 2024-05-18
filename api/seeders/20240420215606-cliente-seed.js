'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Clientes', [
            {
                nome: 'João Silva',
                data_nascimento: new Date('1985-03-15'),
                cpf: '123.456.789-10',
                telefone: '(00) 9876-5432',
                email: 'joao.silva@example.com',
                senha: await bcrypt.hash('senha123', 10),
                endereco: 'Rua das Flores, 123',
                status: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                nome: 'Maria Oliveira',
                data_nascimento: new Date('1992-07-22'),
                cpf: '987.654.321-00',
                telefone: '(00) 1234-5678',
                email: 'maria.oliveira@example.com',
                senha: await bcrypt.hash('abcde123', 10),
                endereco: 'Avenida dos Sonhos, 456',
                status: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                nome: 'Carlos Santos',
                data_nascimento: new Date('1978-11-05'),
                cpf: '456.789.123-30',
                telefone: '(00) 3456-7890',
                email: 'carlos.santos@example.com',
                senha: await bcrypt.hash('senha456', 10),
                endereco: 'Travessa da Alegria, 789',
                status: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                nome: 'Juliana Pereira',
                data_nascimento: new Date('1989-04-10'),
                cpf: '321.654.987-40',
                telefone: '(00) 6789-0123',
                email: 'juliana.pereira@example.com',
                senha: await bcrypt.hash('p4ssw0rd', 10),
                endereco: 'Praça das Artes, 321',
                status: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                nome: 'Rafaela Costa',
                data_nascimento: new Date('1995-09-28'),
                cpf: '789.321.654-50',
                telefone: '(00) 9012-3456',
                email: 'rafaela.costa@example.com',
                senha: await bcrypt.hash('rafa123', 10),
                endereco: 'Alameda dos Lagos, 987',
                status: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                nome: 'Pedro Alves',
                data_nascimento: new Date('1983-12-03'),
                cpf: '654.987.321-60',
                telefone: '(00) 2345-6789',
                email: 'pedro.alves@example.com',
                senha: await bcrypt.hash('alves123', 10),
                endereco: 'Rua dos Bosques, 654',
                status: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                nome: 'Luciana Mendes',
                data_nascimento: new Date('1976-06-18'),
                cpf: '987.123.456-70',
                telefone: '(00) 5432-1098',
                email: 'luciana.mendes@example.com',
                senha: await bcrypt.hash('mendes456', 10),
                endereco: 'Avenida das Estrelas, 876',
                status: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                nome: 'Fernando Lima',
                data_nascimento: new Date('1990-01-25'),
                cpf: '147.258.369-80',
                telefone: '(00) 8765-4321',
                email: 'fernando.lima@example.com',
                senha: await bcrypt.hash('f3rn4nd0', 10),
                endereco: 'Praia do Sol, 543',
                status: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                nome: 'Sandra Souza',
                data_nascimento: new Date('1987-08-14'),
                cpf: '369.258.147-90',
                telefone: '(00) 6789-5432',
                email: 'sandra.souza@example.com',
                senha: await bcrypt.hash('s0uz4', 10),
                endereco: 'Rua das Palmeiras, 210',
                status: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                nome: 'Thiago Nunes',
                data_nascimento: new Date('1980-05-20'),
                cpf: '258.369.147-00',
                telefone: '(00) 9876-2109',
                email: 'thiago.nunes@example.com',
                senha: await bcrypt.hash('nunes321', 10),
                endereco: 'Avenida Central, 876',
                status: true,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Clientes', null, {});
    }
};

