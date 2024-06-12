import { Test, TestingModule } from '@nestjs/testing';
import { ReservasVeiculosController } from './reservas-veiculos.controller';

describe('ReservasVeiculosController', () => {
  let controller: ReservasVeiculosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservasVeiculosController],
    }).compile();

    controller = module.get<ReservasVeiculosController>(ReservasVeiculosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
