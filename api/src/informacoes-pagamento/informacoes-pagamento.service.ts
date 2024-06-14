import { Inject, Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateInformacoesPagamentoDto } from './dto/create-informacoes-pagamento';
import { UpdateInformacoesPagamentoDto} from './dto/update-informacoes-pagamento';
import { InformacoesPagamento } from './entities/informacoes-pagamento.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';

@Injectable()
export class InformacoesPagamentoService {
  constructor(
    @Inject('INFORMACOES_PAGAMENTO_REPOSITORY')
    private informacoesPagamentoRepository: typeof InformacoesPagamento
  ) {
  }

  async create(createInformacoesPagamentoDto: CreateInformacoesPagamentoDto) {
   

    return await this.informacoesPagamentoRepository.create({
      cliente_id: createInformacoesPagamentoDto.cliente_id,
      numero_cartao: createInformacoesPagamentoDto.numero_cartao,
      nome_titular: createInformacoesPagamentoDto.nome_titular,
      validade: createInformacoesPagamentoDto.validade,
      codigo_seguranca: createInformacoesPagamentoDto.codigo_seguranca
    });
  }

  async findAll() {
    return await this.informacoesPagamentoRepository.findAll({
      include: [
        {
          model: Cliente,
          as: 'cliente'
        }
      ]
    });
  }

  async findOne(id: number) {
    const record = await this.informacoesPagamentoRepository.findByPk(id);

    if (!record) {
      throw new NotFoundException('Método de pagamento não encontrado');
    }

    return record;
  }

  update(id: number, updateInformacoesPagamentoDto: UpdateInformacoesPagamentoDto) {
    return `This action updates a #${id} informacoes-pagamento`;
  }

  async remove(id: number) {
    const record = await this.findOne(id);
    await record.destroy();
  }
}
