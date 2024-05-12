import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InformacoesVeiculoService } from './informacoes-veiculo.service';
import { CreateInformacoesVeiculoDto } from './dto/create-informacoes-veiculo.dto';
import { UpdateInformacoesVeiculoDto } from './dto/update-informacoes-veiculo.dto';

@Controller('informacao-veiculo')
export class InformacoesVeiculoController {
  constructor(private readonly informacoesVeiculoService: InformacoesVeiculoService) {}

  @Post()
  create(@Body() createInformacoesVeiculoDto: CreateInformacoesVeiculoDto) {
    return this.informacoesVeiculoService.create(createInformacoesVeiculoDto);
  }

  @Get()
  findAll() {
    return this.informacoesVeiculoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.informacoesVeiculoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateInformacoesVeiculoDto: UpdateInformacoesVeiculoDto) {
    return this.informacoesVeiculoService.update(id, updateInformacoesVeiculoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.informacoesVeiculoService.remove(id);
  }
}
