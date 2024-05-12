import { Test, TestingModule } from '@nestjs/testing';
import { InformacoesVeiculoService } from './informacoes-veiculo.service';

describe('InformacoesVeiculoService', () => {
  let service: InformacoesVeiculoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InformacoesVeiculoService],
    }).compile();

    service = module.get<InformacoesVeiculoService>(InformacoesVeiculoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
