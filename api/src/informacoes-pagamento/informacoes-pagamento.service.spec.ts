import { Test, TestingModule } from '@nestjs/testing';
import { InformacoesPagamentoService } from './informacoes-pagamento.service';

describe('InformacoesPagamentoService', () => {
  let service: InformacoesPagamentoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InformacoesPagamentoService],
    }).compile();

    service = module.get<InformacoesPagamentoService>(InformacoesPagamentoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
