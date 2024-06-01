import { Cor } from './entities/cor.entity';

export const corProviders = [
  {
    provide: 'COR_REPOSITORY',
    useValue: Cor,
  },
];
