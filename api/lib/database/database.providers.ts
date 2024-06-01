import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { Cliente } from '../../src/cliente/entities/cliente.entity';
import { InformacoesVeiculo } from '../../src/informacoes-veiculo/entities/informacoes-veiculo.entity';
import {Cor} from '../../src/cor/entities/cor.entity'
import { Categoria } from '../../src/categoria/entities/categoria.entity';
import * as databaseConfig from './database.config';


export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(databaseConfig as SequelizeOptions);
      sequelize.addModels([Cliente, InformacoesVeiculo, Categoria, Cor]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
