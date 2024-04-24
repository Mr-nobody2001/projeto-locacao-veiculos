import { Cliente } from './entities/cliente.entity';

export const clienteProviders = [
  {
    provide: 'CLIENTE_REPOSITORY',
    useValue: Cliente,
  },
];
