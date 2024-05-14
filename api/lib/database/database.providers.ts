import {Sequelize, SequelizeOptions} from 'sequelize-typescript';
import {Cliente} from '../../src/cliente/entities/cliente.entity';
import {InformacoesVeiculo} from "../../src/informacoes-veiculo/entities/informacoes-veiculo.entity";
import * as databaseConfig from './database.config';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize(databaseConfig as SequelizeOptions);
            sequelize.addModels([Cliente, InformacoesVeiculo]);
            await sequelize.sync();
            return sequelize;
        },
    },
];
