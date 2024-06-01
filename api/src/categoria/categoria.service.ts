import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Categoria } from './entities/categoria.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @Inject('CATEGORIA_REPOSITORY')
    private categoriaRepository: typeof Categoria,
  ) {}

  findAll() {
    return this.categoriaRepository.findAll();
  }

  async findOne(id: number) {
    const categoria = await this.categoriaRepository.findByPk(id);

    if (!categoria) {
      throw new NotFoundException('Categoria não encontrada');
    }

    return categoria;
  }
}
