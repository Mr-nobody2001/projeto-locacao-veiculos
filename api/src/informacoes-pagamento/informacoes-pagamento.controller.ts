import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateInformacoesPagamentoDto } from './dto/create-informacoes-pagamento';
import { InformacoesPagamentoService } from './informacoes-pagamento.service';
import { UpdateInformacoesPagamentoDto } from './dto/update-informacoes-pagamento';

@Controller('informacoes-pagamento')
export class InformacoesPagamentoController {
  constructor(private informacoesPagamentoService: InformacoesPagamentoService) {}
  
  @Post()
  create(@Body() createInformacoesPagamentoDto: CreateInformacoesPagamentoDto) {
    return this.informacoesPagamentoService.create(createInformacoesPagamentoDto);
  }

  @Get()
  findAll() {
    return this.informacoesPagamentoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.informacoesPagamentoService.findOne(+id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInformacoesPagamentoDto: UpdateInformacoesPagamentoDto) {
    return this.informacoesPagamentoService.update(+id, updateInformacoesPagamentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.informacoesPagamentoService.remove(+id);
  }

}


