import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Cor } from './entities/cor.entity';

@Injectable()
export class CorService {
  constructor(
    @Inject('COR_REPOSITORY')
    private corRepository: typeof Cor,
  ) {}

  findAll() {
    return this.corRepository.findAll();
  }

  async findOne(id: number) {
    const cor = await this.corRepository.findByPk(id);

    if (!cor) {
      throw new NotFoundException('Categoria não encontrada');
    }

    return cor;
  }
}
