import { Inject, Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateVeiculoDto } from './dto/create-veiculo.dto';
import { UpdateVeiculoDto } from './dto/update-veiculo.dto';
import { Veiculo } from './entities/veiculo.entity';
import { Categoria } from 'src/categoria/entities/categoria.entity';
import { Cor } from 'src/cor/entities/cor.entity';
import { InformacoesVeiculo } from 'src/informacoes-veiculo/entities/informacoes-veiculo.entity';

@Injectable()
export class VeiculoService {
  constructor(
    @Inject('VEICULO_REPOSITORY')
    private veiculoRepository: typeof Veiculo
  ) {
  }

  async create(createVeiculoDto: CreateVeiculoDto) {
    const record = await this.veiculoRepository.findOne({
      where: { placa: createVeiculoDto.placa }
    });

    if (record) {
      throw new BadRequestException('Essa placa já foi cadastrada');
    }

    return await this.veiculoRepository.create({
      informacoesVeiculoId: createVeiculoDto.informacoesVeiculoId,
      placa: createVeiculoDto.placa,
      corId: createVeiculoDto.corId,
      categoriaId: createVeiculoDto.categoriaId,
      quilometragem: createVeiculoDto.quilometragem,
      disponibilidade: createVeiculoDto.disponibilidade,
      ultimaManutencao: createVeiculoDto.ultimaManutencao
    });
  }

  async findAll() {
    return await this.veiculoRepository.findAll({
      include: [
        {
          model: Categoria,
          as: 'categoria'
        },
        {
          model: Cor,
          as: 'cor'
        },
        {
          model: InformacoesVeiculo,
          as: 'informacoesVeiculo'
        }
      ]
    });
  }

  async findOne(id: number) {
    const record = await this.veiculoRepository.findByPk(id);

    if (!record) {
      throw new NotFoundException('Veículo não encontrado');
    }

    return record;
  }

  update(id: number, updateVeiculoDto: UpdateVeiculoDto) {
    return `This action updates a #${id} veiculo`;
  }

  async remove(id: number) {
    const record = await this.findOne(id);
    await record.destroy();
  }
}
