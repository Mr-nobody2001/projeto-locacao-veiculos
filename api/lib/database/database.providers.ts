import { Sequelize } from 'sequelize-typescript';
import { ClienteS } from '../../src/cliente/entities/cliente.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '92469439',
        database: 'projeto_locacao_veiculos',
      });
      sequelize.addModels([ClienteS]);
      await sequelize.sync(/*{ force: true }*/);
      return sequelize;
    },
  },
];
