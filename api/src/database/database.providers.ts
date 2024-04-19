import { Sequelize } from 'sequelize-typescript';
import {Cliente} from "../cliente/entities/cliente.entity";


export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: '123456',
                database: 'projeto_locacao_veiculos',
            });
            sequelize.addModels([Cliente]);
            await sequelize.sync(/*{ force: true }*/);
            return sequelize;
        },
    },
];