import { Test, TestingModule } from '@nestjs/testing';
import {InformacoesPagamentoController } from './informacoes-pagamento.controller';

describe('InformacoesPagamentoController', () => {
  let controller: InformacoesPagamentoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InformacoesPagamentoController],
    }).compile();

    controller = module.get<InformacoesPagamentoController>(InformacoesPagamentoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
