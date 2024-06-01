import { Categoria } from './entities/categoria.entity';

export const categoriaProviders = [
  {
    provide: 'CATEGORIA_REPOSITORY',
    useValue: Categoria,
  },
];
