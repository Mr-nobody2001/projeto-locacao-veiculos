import { Test, TestingModule } from '@nestjs/testing';
import { InformacoesVeiculoController } from './informacoes-veiculo.controller';
import { InformacoesVeiculoService } from './informacoes-veiculo.service';

describe('InformacoesVeiculoController', () => {
  let controller: InformacoesVeiculoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InformacoesVeiculoController],
      providers: [InformacoesVeiculoService],
    }).compile();

    controller = module.get<InformacoesVeiculoController>(InformacoesVeiculoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
