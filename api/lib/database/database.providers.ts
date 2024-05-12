import {Sequelize} from 'sequelize-typescript';
import {Cliente} from '../../src/cliente/entities/cliente.entity';
import {InformacoesVeiculo} from "../../src/informacoes-veiculo/entities/informacoes-veiculo.entity";
import * as process from "process";

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'postgres',
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT),
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
            });
            sequelize.addModels([Cliente, InformacoesVeiculo]);
            await sequelize.sync();
            return sequelize;
        },
    },
];

