import {Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode} from '@nestjs/common';
import {ClienteService} from './cliente.service';
import {CreateClienteDto} from './dto/create-cliente.dto';
import {UpdateClienteDto} from './dto/update-cliente.dto';

@Controller('cliente')
export class ClienteController {
    constructor(private readonly clienteService: ClienteService) {
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createClienteDto: CreateClienteDto) {
        return this.clienteService.create(createClienteDto);
    }

    @Get()
    findAll() {
        return this.clienteService.findAll();
    }

    @Get('/id/:id')
    findOne(@Param('id') id: number) {
        return this.clienteService.findOne(id);
    }

    @Get('/email/:email')
    findByEmail(@Param('email') email: string) {
        return this.clienteService.findByEmail(email);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
        return this.clienteService.update(+id, updateClienteDto);
    }

    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id') id: number) {
        return this.clienteService.remove(id);
    }
}
