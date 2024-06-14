import { PartialType } from '@nestjs/mapped-types';
import { CreateInformacoesPagamentoDto} from './create-informacoes-pagamento';

export class UpdateInformacoesPagamentoDto extends PartialType(CreateInformacoesPagamentoDto) {}
