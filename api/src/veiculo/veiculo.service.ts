import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { CreateVeiculoDto } from './dto/create-veiculo.dto';
import { UpdateVeiculoDto } from './dto/update-veiculo.dto';
import { Veiculo } from './entities/veiculo.entity';

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

  findAll() {
    return `This action returns all veiculo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} veiculo`;
  }

  update(id: number, updateVeiculoDto: UpdateVeiculoDto) {
    return `This action updates a #${id} veiculo`;
  }

  remove(id: number) {
    return `This action removes a #${id} veiculo`;
  }
}
