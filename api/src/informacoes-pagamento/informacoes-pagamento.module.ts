import { Module } from '@nestjs/common';
import { InformacoesPagamentoService } from './informacoes-pagamento.service';
import { InformacoesPagamentoController } from './informacoes-pagamento.controller';
import { InformacoesPagamento } from './entities/informacoes-pagamento.entity';

@Module({
  controllers: [InformacoesPagamentoController],
  providers: [
    InformacoesPagamentoService,
    { provide: 'INFORMACOES_PAGAMENTO_REPOSITORY', useValue: InformacoesPagamento }
  ],
})
export class InformacoesPagamentoModule {}